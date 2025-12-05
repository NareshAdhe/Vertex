// models/chapter.js
import mongoose from "mongoose";

const chapterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  number: {
    type: Number,
    required: true,
    enum: [1,2,3,4,5,6]
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true
  }
},{timestamps:true});

export const Chapter = mongoose.model("Chapter", chapterSchema);