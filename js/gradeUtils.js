// gradeUtils.js
// Grade Utility Module
// Reusable, pure functions for computing grades, statuses, remarks,
// and for searching/filtering/aggregating student records.

// Grade weights used in all computations. Kept local to this module so
// gradeUtils.js has no dependency on students.js and works standalone
// against any valid student array/object the grader supplies.
const QUIZ_WEIGHT = 0.25;
const LAB_WEIGHT = 0.35;
const EXAM_WEIGHT = 0.40;

/**
 * Return the numeric weighted final grade for a single student.
 * Weights: Quiz 25%, Laboratory 35%, Exam 40%.
 * Uses object destructuring to pull the needed scores off the student.
 */
export function calculateFinalGrade(student) {
  const { quiz, lab, exam } = student;
  const finalGrade = quiz * QUIZ_WEIGHT + lab * LAB_WEIGHT + exam * EXAM_WEIGHT;
  return finalGrade;
}

/**
 * Classify a numeric final grade into an academic status label.
 * 90+            -> "Excellent"
 * 75 - 89.99     -> "Passed"
 * 70 - 74.99     -> "Needs Improvement"
 * below 70       -> "Failed"
 */
export function getAcademicStatus(grade) {
  if (grade >= 90) {
    return "Excellent";
  } else if (grade >= 75) {
    return "Passed";
  } else if (grade >= 70) {
    return "Needs Improvement";
  } else {
    return "Failed";
  }
}

/**
 * Classify a numeric final grade into a performance remark using a
 * switch(true) structure, as required by the control-structure requirement.
 * 90+            -> "Outstanding"
 * 85 - 89.99     -> "Very Good"
 * 80 - 84.99     -> "Good"
 * 75 - 79.99     -> "Satisfactory"
 * below 75       -> "Unsatisfactory"
 */
export function getPerformanceRemark(grade) {
  switch (true) {
    case grade >= 90:
      return "Outstanding";
    case grade >= 85:
      return "Very Good";
    case grade >= 80:
      return "Good";
    case grade >= 75:
      return "Satisfactory";
    default:
      return "Unsatisfactory";
  }
}

/**
 * Return the students whose name contains the query string.
 * The search is case-insensitive. Uses filter() with an arrow function.
 */
export function searchStudents(students, query) {
  const normalizedQuery = query.trim().toLowerCase();
  return students.filter((student) =>
    student.name.toLowerCase().includes(normalizedQuery)
  );
}

/**
 * Return all students when block is "All"; otherwise return only the
 * students belonging to the selected block.
 */
export function filterStudentsByBlock(students, block) {
  if (block === "All") {
    return students;
  }
  return students.filter((student) => student.block === block);
}

/**
 * Return all students when status is "All"; otherwise return only the
 * students whose computed academic status matches the selected status.
 */
export function filterStudentsByStatus(students, status) {
  if (status === "All") {
    return students;
  }
  return students.filter(
    (student) => getAcademicStatus(calculateFinalGrade(student)) === status
  );
}

/**
 * Return the numeric average of the computed final grades for the
 * supplied array of students. Returns 0 for an empty array.
 * Uses reduce() for the aggregation.
 */
export function calculateClassAverage(students) {
  if (students.length === 0) {
    return 0;
  }
  const total = students.reduce(
    (sum, student) => sum + calculateFinalGrade(student),
    0
  );
  return total / students.length;
}

/**
 * Return the count of students with a final grade of 75 or higher.
 */
export function countPassingStudents(students) {
  return students.filter((student) => calculateFinalGrade(student) >= 75).length;
}

/**
 * Return the student object with the highest computed final grade.
 * Returns null for an empty array. Uses reduce() for the aggregation.
 */
export function getTopStudent(students) {
  if (students.length === 0) {
    return null;
  }
  return students.reduce((topStudent, currentStudent) => {
    return calculateFinalGrade(currentStudent) > calculateFinalGrade(topStudent)
      ? currentStudent
      : topStudent;
  });
}
