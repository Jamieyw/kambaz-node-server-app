import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findQuizzesForCourse(courseId) {
  return model.find({course: courseId});
}

export function createQuiz(quiz) {
  const newQuiz = {...quiz, _id: uuidv4()};
  return model.create(newQuiz);
}

export function deleteQuiz(quizId) {
  return model.deleteOne({_id: quizId});
}

export function updateQuiz(quizId, quizUpdates) {
  return model.updateOne({_id: quizId}, {$set: quizUpdates});
}

export function findQuizzesByPartialTitleAndCourse(courseId, partialTitle) {
  const regex = new RegExp(partialTitle, "i");
  return model.find({course: courseId, title: {$regex: regex}});
}

export function findQuizById(quizId) {
  return model.findOne({_id: quizId});
}