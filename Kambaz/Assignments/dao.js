import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findAssignmentsForCourse(courseId) {
  return Database.assignments.filter((assignment) => assignment.course === courseId);
}

export function createAssignment(assignment) {
  const newAssignment = {
    ...assignment,
    _id: uuidv4(),
  };
  Database.assignments.push(newAssignment);
  return newAssignment;
}

export function deleteAssignment(assignmentId) {
  Database.assignments = Database.assignments.filter(
    (a) => a._id !== assignmentId
  );
  return { status: "OK", message: `Assignment with ID ${assignmentId} deleted` };
}

export function updateAssignment(assignmentId, assignmentUpdates) {
  const assignment = Database.assignments.find(
    (a) => a._id === assignmentId
  );
  if (!assignment) {
    return { status: "Error", message: `Assignment with ID ${assignmentId} not found` };
  }
  Object.assign(assignment, assignmentUpdates);
  return { status: "OK", message: `Assignment with ID ${assignmentId} updated` };
}

export function findAssignmentById(assignmentId) {
  return Database.assignments.find((a) => a._id === assignmentId);
}