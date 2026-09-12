// display.js
// Display Module
// Functions in this module are responsible ONLY for rendering data to the
// webpage. They do not compute grades/statuses/filters themselves.

import {
  calculateFinalGrade,
  getAcademicStatus,
  getPerformanceRemark,
  calculateClassAverage,
  countPassingStudents,
  getTopStudent,
} from "./gradeUtils.js";

/**
 * Show a message in the required message area.
 * Passing an empty string clears the message area.
 */
export function displayMessage(message) {
  const messageArea = document.getElementById("messageArea");
  messageArea.textContent = message;
}

/**
 * Render one student card for each supplied student inside #studentList.
 * When the result set is empty, the message area displays exactly
 * "No students found" and the list container is cleared.
 */
export function displayStudents(students) {
  const studentList = document.getElementById("studentList");
  studentList.innerHTML = "";

  if (students.length === 0) {
    displayMessage("No students found");
    return;
  }

  displayMessage("");

  students.forEach((student) => {
    const { id, name, block, quiz, lab, exam } = student;
    const finalGrade = calculateFinalGrade(student);
    const status = getAcademicStatus(finalGrade);
    const remark = getPerformanceRemark(finalGrade);

    const card = document.createElement("article");
    card.className = "student-card";
    card.dataset.id = id;

    card.innerHTML = `
      <h3 class="student-name">${name}</h3>
      <p class="student-block">Block: ${block}</p>
      <div class="student-scores">
        <span>Quiz: ${quiz}</span>
        <span>Lab: ${lab}</span>
        <span>Exam: ${exam}</span>
      </div>
      <p class="student-final-grade">Final Grade: ${finalGrade.toFixed(2)}</p>
      <p class="student-status status-${status.replace(/\s+/g, "-").toLowerCase()}">${status}</p>
      <p class="student-remark">Remark: ${remark}</p>
    `;

    studentList.appendChild(card);
  });
}

/**
 * Update the class average, passing count, total displayed students,
 * and top-student name based on the currently displayed result set.
 */
export function displaySummary(students) {
  const classAverageEl = document.getElementById("classAverage");
  const passingCountEl = document.getElementById("passingCount");
  const displayedCountEl = document.getElementById("displayedCount");
  const topStudentEl = document.getElementById("topStudent");

  displayedCountEl.textContent = students.length;

  const average = calculateClassAverage(students);
  const passingCount = countPassingStudents(students);
  const topStudent = getTopStudent(students);

  classAverageEl.textContent = average.toFixed(2);
  passingCountEl.textContent = passingCount;
  topStudentEl.textContent = topStudent
    ? `${topStudent.name} (${calculateFinalGrade(topStudent).toFixed(2)})`
    : "N/A";
}
