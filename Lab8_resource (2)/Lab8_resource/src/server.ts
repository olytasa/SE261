import express, { Request, Response } from "express";
import path from "path";
import { addBook, deleteBook, readBooks } from "./services/bookFileDb";

const app = express();
const PORT = process.env.PORT || 3000;

// TODO 5: Add middleware for HTML form + JSON + static files
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));

app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
});

app.get("/books", (req: Request, res: Response) => {
  const books = readBooks();
  const query = (req.query.q as string | undefined)?.trim().toLowerCase();
  if (!query) {
    return res.json(books);
  }

  const filtered = books.filter(book =>
    book.bookName.toLowerCase().includes(query)
  );
  return res.json(filtered);
});

app.post("/books/add", (req: Request, res: Response) => {
  try {
    const bookName = (req.body.bookName || "").trim();
    if (!bookName) {
      return res.status(400).send("bookName is required");
    }
    addBook(bookName);
    return res.redirect("/");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

app.delete("/books/:bookNo", (req: Request, res: Response) => {
  try {
    const bookNo = Number(req.params.bookNo);
    if (!Number.isInteger(bookNo) || bookNo <= 0) {
      return res.status(400).send("bookNo must be a positive integer");
    }

    const removed = deleteBook(bookNo);
    if (!removed) {
      return res.status(404).send("Book not found");
    }
    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server running: http://localhost:${PORT}`);
});
