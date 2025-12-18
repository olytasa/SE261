import fs from "fs";
import path from "path";
import { Todo } from "../models/todo";
const dataPath = path.join(process.cwd(), "src", "data", "todos.json");
export function loadTodos(): Todo[] {
const text = fs.readFileSync(dataPath, "utf-8");
return JSON.parse(text) as Todo[];
}
export function saveTodos(todos: Todo[]): void {
fs.writeFileSync(dataPath, JSON.stringify(todos, null, 2), "utf-8");
}
export function addTodo(
todos: Todo[],
title: string,

): Todo[] {
const nextId =
todos.length === 0 ? 1 : Math.max(...todos.map(s => s.id)) + 1;
const newtodo: Todo = { id: nextId, title , done: false };
return [...todos, newtodo];
}