import fs from "fs";
import path from "path";
import { Student } from "../models/student";
const dataPath = path.join(process.cwd(), "src", "data", "students.json");
export function loadStudents(): Student[] {
const text = fs.readFileSync(dataPath, "utf-8");
return JSON.parse(text) as Student[];
}
export function saveStudents(students: Student[]): void {
fs.writeFileSync(dataPath, JSON.stringify(students, null, 2), "utf-8");
}
export function addStudent(
students: Student[],
name: string,
major: string
): Student[] {
const nextId =
students.length === 0 ? 1 : Math.max(...students.map(s => s.id)) + 1;
const newStudent: Student = { id: nextId, name, major };
return [...students, newStudent];
}