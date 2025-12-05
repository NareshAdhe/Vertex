import mongoose from "mongoose"

const questionSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    examYear: {
        type: Number,
        required: function() {
            return this.isPYQ === true;
        }
    },
    questionType: {
        type: String,
        required: true,
        enum: ["theory","mcq","numerical"]
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Subject",
        required: true
    },
    chapter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chapter",
        required: true
    },
    marks: {
        type: Number,
        required: true
    },
    difficulty: {
        type: String,
        required: true,
        enum: ["easy","medium","hard"]
    },
    branch: {
        type: String,
        required: true,
        enum: ["CSE","IT","ECE","EE","ME","CE"]
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
    },
    isPYQ: {
        type: Boolean,
        required: true
    },
    isImportant: {
        type: Boolean,
        required: true
    },
    examSession: {
        type: String,
        required: true,
        enum: ["Mid Sem","End Sem","Re Exam"]
    },
    frequency: {
        type: Number,
        default: 1,
        min: 1
    },
    solution: {
        type: String
    },
    tags: {
        type: [String],
        default: []
    },
    fileUrl: {
        type: String,
        default: ""
    },
    fileType: {
        type: String,
        enum: ["image", "pdf", "none"],
        default: "none"
    }
},{timestamps:true});

export const Question = mongoose.model("Question",questionSchema);