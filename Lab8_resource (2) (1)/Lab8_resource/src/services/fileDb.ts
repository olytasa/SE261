import fs from "fs";
import path from "path";
import { Book } from "../models/Book";

type DbShape = { books: Book[] };

const dbPath = path.join(process.cwd(), "data", "books.json");

// TODO 1: Implement readDb(): DbShape
// - If file not found: create data folder + books.json with { books: [] }
// - Read file text (utf-8) and JSON.parse
function readDb(): DbShape {
  if (!fs.existsSync(dbPath)) {
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    fs.writeFileSync(dbPath, JSON.stringify({ books: [] }, null, 2));
  }
  const fileContent = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(fileContent);
}


// TODO 2: Implement writeDb(db: DbShape)
// - JSON.stringify(db, null, 2) and writeFileSync utf-8
function writeDb(db: DbShape) {
  const json = JSON.stringify(db, null, 2);
  fs.writeFileSync(dbPath, json, "utf-8");
}


export function readBooks(): Book[] {
  return readDb().books;
}

export function searchBooksByName(name: string): Book[] {
  const keyword = name.trim().toLowerCase();
  if (!keyword) {
    return readBooks();
  }
  return readBooks().filter((book) =>
    book.bookName.toLowerCase().includes(keyword)
  );
}


export function addBook(bookName: string): Book {
  const trimmedName = bookName.trim();
  if (!trimmedName) {
    throw new Error("bookName is required");
  }
  const db = readDb();
  const maxBookNo =
    db.books.length === 0
      ? 0
      : Math.max(...db.books.map(b => b.bookNo));

  const newBook: Book = {
    bookNo: maxBookNo + 1,
    bookName: trimmedName
  };
  db.books.push(newBook);
  writeDb(db);
  return newBook;
}

export function deleteBook(bookNo: number): boolean {
  const db = readDb();
  const originalCount = db.books.length;
  db.books = db.books.filter(b => b.bookNo !== bookNo);
  if (db.books.length === originalCount) {
    return false;
  }
  writeDb(db);
  return true;
}

