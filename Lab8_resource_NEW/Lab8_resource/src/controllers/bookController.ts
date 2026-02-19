import { Request, Response } from "express";
import { addBook, readBooks, searchBooksByName,deleteBook } from "../services/fileDb";
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

export function deletecontrolBook(req: Request, res: Response) {
  let bookNo = req.params.bookNo;
  if (!bookNo) {
    return res.status(400).send("bookNo is required");
  }
  if (Array.isArray(bookNo)) {
    bookNo = bookNo[0];
  }
  const id = Number.parseInt(bookNo, 10);
  if (Number.isNaN(id)) {
    return res.status(400).send("bookNo must be a valid number");
  }
  try {
    const books = readBooks();
    const deleted = deleteBook(id);
    console.log("Deleting book:", id);
    if (!deleted) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
}