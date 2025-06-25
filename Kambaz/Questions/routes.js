import * as questionsDao from "./dao.js";
import * as quizzesDao from "../Quizzes/dao.js";

export default function QuestionRoutes(app) {
  // Get a specific question
  app.get("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    const question = await questionsDao.findQuestionById(questionId);
    res.json(question);
  });

  // Update a question and return the object
  app.put("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    const originalQuestion = await questionsDao.findQuestionById(questionId);
    if (!originalQuestion) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Perform the update.
    await questionsDao.updateQuestion(questionId, req.body);
    const updatedQuestion = await questionsDao.findQuestionById(questionId);

    // Update quiz points
    const totalPoints = await questionsDao.calculateTotalPointsForQuiz(originalQuestion.quizId);
    await quizzesDao.updateQuiz(originalQuestion.quizId, { 
      points: totalPoints[0]?.totalPoints || 0 
    });
    
    // Send the full updated question object back to the frontend
    res.json(updatedQuestion); 
  });

  // Delete a question
  app.delete("/api/questions/:questionId", async (req, res) => {
    const { questionId } = req.params;
    const question = await questionsDao.findQuestionById(questionId);
    await questionsDao.deleteQuestion(questionId);
    
    // Update quiz points and question count
    const totalPoints = await questionsDao.calculateTotalPointsForQuiz(question.quizId);
    const questionCount = await questionsDao.countQuestionsForQuiz(question.quizId);
    await quizzesDao.updateQuiz(question.quizId, { 
      points: totalPoints[0]?.totalPoints || 0,
      numQuestions: questionCount 
    });
    
    res.json({ success: true });
  });
}