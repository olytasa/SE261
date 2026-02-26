import fs from "fs";
import path from "path";

export type TodoItem = { id: number; name: string };

const DATA_FILE = path.join(__dirname, "todos.json");

export function readTodos(): TodoItem[] {
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw) as TodoItem[];
}

function writeTodos(items: TodoItem[]): void {
  fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2), "utf-8");
}

export function addTodo(name: string): void {
  const items = readTodos();
  const maxId = items.reduce((m, it) => Math.max(m, it.id), 0);
  items.push({ id: maxId + 1, name });
  writeTodos(items);
}

export function deleteTodo(id: number): void {
  const items = readTodos().filter((it) => it.id !== id);
  writeTodos(items);
}
