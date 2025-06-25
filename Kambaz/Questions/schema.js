import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    _id: String,
    quizId: { type: String, ref: "QuizModel", required: true },
    type: {
      type: String,
      enum: ["multiple-choice", "true-false", "fill-blank"],
      required: true
    },
    points: { type: Number, default: 1 },
    question: { type: String, required: true }, // Rich text content
    order: { type: Number, default: 0 }, // For ordering questions
    
    // For multiple choice questions
    choices: [{
      text: String,
      isCorrect: { type: Boolean, default: false }
    }],
    
    // For true/false questions
    correctAnswer: Boolean,
    
    // For fill-in-blank questions
    blanks: [{
      text: String,
      caseSensitive: { type: Boolean, default: false }
    }]
  },
  { collection: "questions" }
);

export default questionSchema;