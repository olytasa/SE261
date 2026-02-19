import express from "express";
import path from "path";
import {
  createBook,
  renderBooks,
  renderHome,
  renderSearchResults,
  deletecontrolBook,
} from "./controllers/bookController";

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src/views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));
app.set("view engine", "ejs");
app.set("views", path.join(process.cwd(), "src", "views"));

app.get("/", renderHome);
app.get("/books", renderBooks);
app.get("/books/search", renderSearchResults);
app.post("/books/add", createBook);
app.delete("/books/:bookNo", deletecontrolBook);
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
