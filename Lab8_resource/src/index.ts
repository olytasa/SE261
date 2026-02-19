import express from "express";
import path from "path";
import {
  createBook,
  renderBooks,
  renderHome,
  renderSearchResults,
} from "./controllers/bookController";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));

app.use(express.urlencoded({ extended: true }));

app.get("/", renderHome);
app.get("/books", renderBooks);
app.get("/books/search", renderSearchResults);
app.post("/books/add", createBook);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
