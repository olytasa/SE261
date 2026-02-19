async function loadBooks(query) {
  const url = query ? `/books?q=${encodeURIComponent(query)}` : "/books";
  const res = await fetch(url);
  const books = await res.json();

  const el = document.getElementById("book-list");

  el.innerHTML = books
    .map(
      b =>
        `<div class="book-item" data-id="${b.bookNo}">
          <span>${b.bookNo}. ${b.bookName}</span>
          <button type="button" class="delete-btn" data-id="${b.bookNo}">Delete</button>
        </div>`
    )
    .join("");
}

window.addEventListener("DOMContentLoaded", () => {
  loadBooks("");

  const searchInput = document.getElementById("search-input");
  const searchBtn = document.getElementById("search-btn");
  const clearBtn = document.getElementById("clear-btn");

  if (searchBtn) {
    searchBtn.addEventListener("click", () => {
      const query = searchInput ? searchInput.value.trim() : "";
      loadBooks(query);
    });
  }

  if (searchInput) {
    searchInput.addEventListener("keydown", event => {
      if (event.key === "Enter") {
        event.preventDefault();
        const query = searchInput.value.trim();
        loadBooks(query);
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (searchInput) {
        searchInput.value = "";
      }
      loadBooks("");
    });
  }
});

document.addEventListener("click", async event => {
  const target = event.target;
  if (!target || !target.classList || !target.classList.contains("delete-btn")) {
    return;
  }

  const bookNo = Number(target.getAttribute("data-id"));
  if (!Number.isInteger(bookNo)) {
    return;
  }

 const res = await fetch(`/books/${bookNo}`, { method: "DELETE" });
  if (res.ok) {
    const searchInput = document.getElementById("search-input");
    const query = searchInput ? searchInput.value.trim() : "";
    await loadBooks(query);
  } else {
    const message = await res.text();
    alert(message || "Delete failed");
  }
});
