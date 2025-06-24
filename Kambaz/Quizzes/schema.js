import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    description: String,
    course: {type: String, ref: "CourseModel"},
    published: Boolean,
    numQuestions: Number,
    assignedTo: String,
    quizType: String,
    points: Number,
    assignmentGroup: String,
    shuffleAnswers: String,
    timeLimit: Number,
    multipleAttempts: String,
    viewResponses: String,
    showCorrectAnswers: String,
    accessCode: String,
    oneQuestionAtATime: String,
    webcamRequired: String,
    dueDate: Date,
    availableDate: Date,
    untilDate: Date,
    lockQuestionsAfterAnswer: String,
    requireRespondusLockDownBrowser: String,
    requiredtoViewQuizResults: String,
  },
  {collection: "quizzes"}
);

export default schema;