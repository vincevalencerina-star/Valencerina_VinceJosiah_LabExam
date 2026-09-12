// main.js
// Main / Controller Module
// Connects the data module, grade utility module, and display module to
// the user interface. Handles all user interaction via addEventListener().

import { students } from "./students.js";
import {
  searchStudents,
  filterStudentsByBlock,
  filterStudentsByStatus,
} from "./gradeUtils.js";
import { displayStudents, displaySummary } from "./display.js";

// --- Select required HTML controls using the exact IDs from the spec ---
const searchInput = document.getElementById("searchInput");
const blockFilter = document.getElementById("blockFilter");
const statusFilter = document.getElementById("statusFilter");
const applyBtn = document.getElementById("applyBtn");
const resetBtn = document.getElementById("resetBtn");

/**
 * Apply the current search text, block filter, and status filter together,
 * then render the matching records and update the summary.
 */
function applyFilters() {
  const query = searchInput.value;
  const block = blockFilter.value;
  const status = statusFilter.value;

  let result = students;
  result = searchStudents(result, query);
  result = filterStudentsByBlock(result, block);
  result = filterStudentsByStatus(result, status);

  displayStudents(result);
  displaySummary(result);
}

/**
 * Reset all controls to their initial state and restore all six
 * records and the initial summary.
 */
function resetFilters() {
  searchInput.value = "";
  blockFilter.value = "All";
  statusFilter.value = "All";

  displayStudents(students);
  displaySummary(students);
}

// --- Register event listeners (no inline onclick attributes) ---
applyBtn.addEventListener("click", applyFilters);
resetBtn.addEventListener("click", resetFilters);

// Live search as the user types; Apply Filters still works independently.
searchInput.addEventListener("input", applyFilters);

// Update immediately on filter change; Apply Filters still works too.
blockFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);

// --- Display all six student records and the initial summary on load ---
displayStudents(students);
displaySummary(students);
