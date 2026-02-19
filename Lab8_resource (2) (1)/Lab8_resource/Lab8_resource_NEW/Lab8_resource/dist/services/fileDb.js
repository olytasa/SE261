"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.readBooks = readBooks;
exports.searchBooksByName = searchBooksByName;
exports.addBook = addBook;
exports.deleteBook = deleteBook;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dbPath = path_1.default.join(process.cwd(), "data", "books.json");
// TODO 1: Implement readDb(): DbShape
// - If file not found: create data folder + books.json with { books: [] }
// - Read file text (utf-8) and JSON.parse
function readDb() {
    if (!fs_1.default.existsSync(dbPath)) {
        fs_1.default.mkdirSync(path_1.default.dirname(dbPath), { recursive: true });
        fs_1.default.writeFileSync(dbPath, JSON.stringify({ books: [] }, null, 2));
    }
    const fileContent = fs_1.default.readFileSync(dbPath, "utf-8");
    return JSON.parse(fileContent);
}
// TODO 2: Implement writeDb(db: DbShape)
// - JSON.stringify(db, null, 2) and writeFileSync utf-8
function writeDb(db) {
    const json = JSON.stringify(db, null, 2);
    fs_1.default.writeFileSync(dbPath, json, "utf-8");
}
function readBooks() {
    return readDb().books;
}
function searchBooksByName(name) {
    const keyword = name.trim().toLowerCase();
    if (!keyword) {
        return readBooks();
    }
    return readBooks().filter((book) => book.bookName.toLowerCase().includes(keyword));
}
function addBook(bookName) {
    const trimmedName = bookName.trim();
    if (!trimmedName) {
        throw new Error("bookName is required");
    }
    const db = readDb();
    const maxBookNo = db.books.length === 0
        ? 0
        : Math.max(...db.books.map(b => b.bookNo));
    const newBook = {
        bookNo: maxBookNo + 1,
        bookName: trimmedName
    };
    db.books.push(newBook);
    writeDb(db);
    return newBook;
}
function deleteBook(bookNo) {
    const db = readDb();
    const originalCount = db.books.length;
    db.books = db.books.filter(b => b.bookNo !== bookNo);
    if (db.books.length === originalCount) {
        return false;
    }
    writeDb(db);
    return true;
}
