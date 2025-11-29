import * as quizzesDao from "./dao.js";
import * as questionsDao from "../Questions/dao.js";

export default function QuizRoutes(app) {
  app.delete("/api/quizzes/:quizId", async (req, res) => {
    const {quizId} = req.params;
    const status = await quizzesDao.deleteQuiz(quizId);
    res.send(status);
  });

  app.put("/api/quizzes/:quizId", async (req, res) => {
    const {quizId} = req.params;
    const quizUpdates = req.body;
    const status = await quizzesDao.updateQuiz(quizId, quizUpdates);
    res.send(status);
  });

  app.get(`/api/quizzes/:quizId`, async (req, res) => {
    const {quizId} = req.params;
    const quiz = await quizzesDao.findQuizById(quizId);
    res.json(quiz);
  });



  // Get all questions for a quiz
  app.get("/api/quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    const questions = await questionsDao.findQuestionsForQuiz(quizId);
    res.json(questions);
  });

  // Create a new question for a quiz
  app.post("/api/quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    const question = { ...req.body, quizId };
    const newQuestion = await questionsDao.createQuestion(question);
    
    // Update quiz points and question count
    const totalPoints = await questionsDao.calculateTotalPointsForQuiz(quizId);
    const questionCount = await questionsDao.countQuestionsForQuiz(quizId);
    await quizzesDao.updateQuiz(quizId, { 
      points: totalPoints[0]?.totalPoints || 0,
      numQuestions: questionCount 
    });
    
    res.json(newQuestion);
  });

  // Delete all questions for a quiz (called when quiz is deleted)
  app.delete("/api/quizzes/:quizId/questions", async (req, res) => {
    const { quizId } = req.params;
    await questionsDao.deleteQuestionsForQuiz(quizId);
    res.json({ success: true });
  });
}