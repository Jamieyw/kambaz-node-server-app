import Database from "../Database/index.js";
import { v4 as uuidv4 } from "uuid";

export function findEnrollmentsForUser(userId) {
  return Database.enrollments.filter((enrollment) => enrollment.user === userId);
}

export function enrollUserInCourse(userId, courseId) {
  // Check if the user is already enrolled to prevent duplicates
  const existingEnrollment = Database.enrollments.find(
    (enrollment) => enrollment.user === userId && enrollment.course === courseId
  );
  if (existingEnrollment) {
    return { status: "Conflict", message: "User is already enrolled in this course." };
  }

  const newEnrollment = {
    _id: uuidv4(),
    user: userId,
    course: courseId,
  };
  Database.enrollments.push(newEnrollment);
  return newEnrollment;
}

export function unenrollUserFromCourse(userId, courseId) {
  const initialLength = Database.enrollments.length;
  Database.enrollments = Database.enrollments.filter(
    (enrollment) => !(enrollment.user === userId && enrollment.course === courseId)
  );
  if (Database.enrollments.length < initialLength) {
    return { status: "OK", message: "Successfully unenrolled." };
  } else {
    return { status: "Not Found", message: "Enrollment not found." };
  }
}