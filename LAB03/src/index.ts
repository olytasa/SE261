type Student = {
id: number;
name: string;
grade: number;
isActive: boolean;
};
// Create at least 5 students as Sample Data
const students: Student[] = [
{ id: 1, name: "Ann", grade: 3.5, isActive: true },
{ id: 2, name: "Bob", grade: 2.7, isActive: false },
{ id: 3, name: "Cathy", grade: 3.9, isActive: true },
{ id: 4, name: "David", grade: 1.8, isActive: true },
{ id: 5, name: "Eva", grade: 2.3, isActive: false }
];

function getActiveStudents(students: Student[]): Student[] {
return students.filter((s) => s.isActive);
}
function calculateAverageGrade(students: Student[]): number {
if (students.length === 0) return 0;
const total = students.reduce((sum, s) => sum + s.grade, 0);
return total / students.length;
}

console.log("All students:", students);
console.log("Active students:", getActiveStudents(students));
console.log("Average grade:", calculateAverageGrade(students));

// Function to get active students with grade above a certain threshold

