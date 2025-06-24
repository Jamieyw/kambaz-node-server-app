import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export function findQuestionsForQuiz(quizId) {
  return model.find({ quizId }).sort({ order: 1 });
}

export function findQuestionById(questionId) {
  return model.findOne({ _id: questionId });
}

export function createQuestion(question) {
  const newQuestion = { ...question, _id: uuidv4() };
  return model.create(newQuestion);
}

export function updateQuestion(questionId, questionUpdates) {
  return model.updateOne({ _id: questionId }, { $set: questionUpdates });
}

export function deleteQuestion(questionId) {
  return model.deleteOne({ _id: questionId });
}

export function deleteQuestionsForQuiz(quizId) {
  return model.deleteMany({ quizId });
}

export function countQuestionsForQuiz(quizId) {
  return model.countDocuments({ quizId });
}

export function calculateTotalPointsForQuiz(quizId) {
  return model.aggregate([
    { $match: { quizId } },
    { $group: { _id: null, totalPoints: { $sum: "$points" } } }
  ]);
}