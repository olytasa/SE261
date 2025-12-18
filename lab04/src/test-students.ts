import { loadStudents, saveStudents, addStudent } from "./services/studentService";
const students = loadStudents();
const updated = addStudent(students, "Mina", "UX");
saveStudents(updated);
console.log("Updated students:", updated);