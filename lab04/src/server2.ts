import express from "express";
import { loadTodos, saveTodos, addTodo } from "./services/todoService";
const app = express();
app.use(express.urlencoded({ extended: true })); // HTML form body (Week 5)
app.get("/", (req, res) => {
const todos = loadTodos();
const items = todos
.map(t => `<li>${t.done ? "✅" : "⬜"} ${t.title}</li>`)
.join("");
res.send(`
<h1>Todo List</h1>
<ul>${items}</ul>
<form method="POST" action="/todos">
<input name="title" placeholder="New todo" />
<button type="submit">Add</button>
</form>
`);
});
app.post("/todos", (req, res) => {
const title = String(req.body.title ?? "").trim();
if (!title) return res.status(400).send("Title is required");
const todos = loadTodos();
const updated = addTodo(todos, title);
saveTodos(updated);
res.redirect("/");
});
app.listen(3000, () => {
console.log("Open: http://localhost:3000");
});