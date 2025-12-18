import express from "express";
import { formatTitle } from "./utils/format";
const app = express();
app.get("/hello", (req, res) => {
const name = String(req.query.name ?? "student");
res.send(`<h1>Hello ${formatTitle(name)}</h1>`);
});
app.listen(3000, () => {
console.log("Open: http://localhost:3000/hello?name=toey");
});