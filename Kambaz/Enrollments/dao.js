import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

// model.find().populate() returns a Promise (it's an asynchronous 
// database operation), await pauses the execution of this function 
// until that Promise resolves
export async function findCoursesForUser(userId) {
  // .populate("course") tells Mongoose: "For each enrollment document that 
  // you found, look at the _id stored in its course field, then go to the 
  // courses collection (or whatever collection CourseModel refers to), 
  // find the corresponding Course document, and replace the course _id 
  // in the enrollment document with the entire Course document."
  const enrollments = await model.find({ user: userId }).populate("course");
  return enrollments.map((enrollment) => enrollment.course);
}

export async function findUsersForCourse(courseId) {
  const enrollments = await model.find({ course: courseId }).populate("user");
  return enrollments.map((enrollment) => enrollment.user);
}

export function enrollUserInCourse(user, course) {
  return model.create({ user, course, _id: `${user}-${course}` });
}

export function unenrollUserFromCourse(user, course) {
  return model.deleteOne({ user, course });
}