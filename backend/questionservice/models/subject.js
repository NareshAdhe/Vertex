// models/subject.js
import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true,
    enum: [1,2,3,4]
  },
  semester: {
    type: Number,
    required: true,
    enum: [1,2]
  }
},{timestamps:true});

export const Subject = mongoose.model("Subject", subjectSchema);