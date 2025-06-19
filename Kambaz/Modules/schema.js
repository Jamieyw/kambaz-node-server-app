import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    _id: String,
    name: String,
    description: String,
    // The ref: "CourseModel" specifically tells Mongoose that this _id 
    // refers to a document whose model is named "CourseModel".
    course: { type: String, ref: "CourseModel" },
  },
  { collection: "modules" }
);

export default schema;