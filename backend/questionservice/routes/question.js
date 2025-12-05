import express from "express"
import {getQuestions, getChapters, getSubjects} from "../controllers/question.js"

const router = express.Router();

router.get("/",getQuestions);

router.get("/subjects",getSubjects);

router.get("/chapters",getChapters);

export default router;