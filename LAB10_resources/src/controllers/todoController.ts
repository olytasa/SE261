import { Request, Response } from "express";
import { todoItems, addTodo, deleteTodo } from "../data/seed";

export function listTodos(req: Request, res: Response): void {
  res.render("list", {
    listTitle: "Today",
    items: todoItems,
    username: req.session.username,
  });
}

export function createTodo(req: Request, res: Response): void {
  const name = (req.body.newItem ?? "").toString().trim();
  if (name) addTodo(name);
  res.redirect("/todos");
}

export function removeTodo(req: Request, res: Response): void {
  const id = Number(req.body.checkbox);
  if (!isNaN(id)) deleteTodo(id);
  res.redirect("/todos");
}
