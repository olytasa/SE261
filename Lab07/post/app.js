const inputMessage = document.getElementById("msg");
const sendBtn = document.getElementById("btnSend");
const clearBtn = document.getElementById("btnClear");
const statusDiv = document.getElementById("status");
const resultPre = document.getElementById("output");

sendBtn.addEventListener("click", async () => {
  const message = inputMessage.value.trim();

  if (!message) {
    statusDiv.textContent = "Please type a message first.";
    return;
  }

  statusDiv.textContent = "Sending...";
  sendBtn.disabled = true;
  resultPre.classList.add("hidden");
  resultPre.textContent = "";

  try {
    const res = await fetch("https://httpbin.org/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        createdAt: new Date().toISOString(),
      }),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    resultPre.textContent = JSON.stringify(data.json, null, 2);
    resultPre.classList.remove("hidden");
    statusDiv.textContent = "Sent successfully.";
  } catch (err) {
    statusDiv.textContent = `Error: ${err.message}`;
  } finally {
    sendBtn.disabled = false;
  }
});

clearBtn.addEventListener("click", () => {
  inputMessage.value = "";
  statusDiv.textContent = "";
  resultPre.textContent = "";
  resultPre.classList.add("hidden");
  sendBtn.disabled = false;
});
