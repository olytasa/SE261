"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderHome = renderHome;
exports.renderBooks = renderBooks;
exports.renderSearchResults = renderSearchResults;
exports.createBook = createBook;
const fileDb_1 = require("../services/fileDb");
const win32_1 = __importDefault(require("path/win32"));
function renderHome(req, res) {
    res.sendFile(win32_1.default.join(process.cwd(), "public", "index.html"));
}
function renderBooks(req, res) {
    const books = (0, fileDb_1.readBooks)();
    const query = req.query.q?.trim().toLowerCase();
    if (!query) {
        return res.json(books);
    }
    const filtered = books.filter(book => book.bookName.toLowerCase().includes(query));
    return res.json(filtered);
}
function renderSearchResults(req, res) {
    const keyword = String(req.query.name ?? "");
    const books = (0, fileDb_1.searchBooksByName)(keyword);
    return res.render("books", { books, keyword });
}
function createBook(req, res) {
    try {
        const bookName = (req.body.bookName || "").trim();
        if (!bookName) {
            return res.status(400).send("bookName is required");
        }
        (0, fileDb_1.addBook)(bookName);
        return res.redirect("/");
    }
    catch (err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
}
