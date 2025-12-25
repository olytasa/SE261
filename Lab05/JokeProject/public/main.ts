const btn = document.querySelector("#btnJoke") as HTMLButtonElement;
const setupEl = document.querySelector("#setup") as HTMLParagraphElement;
const deliveryEl = document.querySelector("#delivery") as HTMLParagraphElement;
const statusEl = document.querySelector("#status") as HTMLParagraphElement;

type JokeResponse = {
    setup: string;
    delivery: string;
};

btn.addEventListener("click", async () => {
    statusEl.textContent = "Loading...";
    setupEl.textContent = "-";
    deliveryEl.textContent = "-";

    try {
        const res = await fetch("/api/joke");
        const data: JokeResponse = await res.json();

        setupEl.textContent = data.setup;
        deliveryEl.textContent = data.delivery;
        statusEl.textContent = "";
    } catch (err) {
        statusEl.textContent = "Error loading joke!";
        console.error(err);
    }
});
