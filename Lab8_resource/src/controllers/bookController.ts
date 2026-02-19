import { Request, Response } from "express";
import { addBook, readBooks, searchBooksByName } from "../services/fileDb";
import path from "path/win32";

export function renderHome(req: Request, res: Response) {
  res.sendFile(path.join(process.cwd(), "public", "index.html"));
}

export function renderBooks(req: Request, res: Response) {
  const books = readBooks();
  const query = (req.query.q as string | undefined)?.trim().toLowerCase();
  if (!query) {
    return res.json(books);
  }
 
  const filtered = books.filter(book =>
    book.bookName.toLowerCase().includes(query)
  );
  return res.json(filtered);
}

export function renderSearchResults(req: Request, res: Response) {
  const keyword = String(req.query.name ?? "");
  const books = searchBooksByName(keyword);
  return res.render("books", { books, keyword });
}

export function createBook(req: Request, res: Response) {
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
}
