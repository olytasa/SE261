import express, { Request, Response } from "express";
import path from "path";

const app = express();
const port = 3000;

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "../public")));

// Type definition for Joke API response
type JokeApiResponse =
  | { type: "twopart"; setup: string; delivery: string }
  | { type: "single"; joke: string };

// GET API route /api/joke
app.get("/api/joke", async (req: Request, res: Response) => {
  const url = "https://v2.jokeapi.dev/joke/Programming?type=twopart";
  
  try {
    const apiRes = await fetch(url); // return promise
    const data = (await apiRes.json()) as JokeApiResponse;
    
    // Guard (TypeScript safety)
    if (data.type !== "twopart") {
      return res.status(502).json({ message: "Unexpected joke format" });
    }
    
    return res.json({ setup: data.setup, delivery: data.delivery });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch joke" });
  }
});

// Start server
app.listen(port, () => console.log(`http://localhost:${port}`));
