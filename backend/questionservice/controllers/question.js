import { Subject } from "../models/subject.js";
import { Chapter } from "../models/chapter.js";
import { Question } from "../models/question.js";

export const getQuestions = async (req, res) => {
  try {
    const questions = await Question.find()
      .populate("subject")
      .populate("chapter")
      .sort({ createdAt: -1 });

    res.json({ success: true, data: questions });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json({ success: true, data: subjects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getChapters = async (req, res) => {
  try {
    const chapters = await Chapter.find();
    res.json({ success: true, data: chapters });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id)
      .populate("subject")
      .populate("chapter");

    if (!question) {
      return res.status(404).json({ success: false, message: "Question not found" });
    }

    res.json({ success: true, data: question });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};