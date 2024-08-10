const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Question Schema
const questionSchema = new Schema({
    questionText: { type: String, required: true },
    questionType: { type: String, enum: ['multiple-choice', 'written'], required: true },
    options: [{ type: String }], // For multiple-choice questions
    correctAnswer: { type: String }, // For multiple-choice questions
    marks: { type: Number, required: true }, // Marks assigned to the question
    isOptional: { type: Boolean, default: false }, // Indicates if the question is optional
});

// Attempt Schema
const attemptSchema = new Schema({
    student: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    answers: [{ type: String, required: true }], // Array of answers
    marksScored: { type: Number, required: true }, // Marks scored in this attempt
    feedback: { type: String }, // Feedback provided by the teacher
    attemptDate: { type: Date, default: Date.now }, // Date of the attempt
    attemptNumber: { type: Number, required: true } // Track the attempt number
});

// Exam Schema
const examSchema = new Schema({
    class: { type: Schema.Types.ObjectId, ref: 'ClassesModel', required: true }, // Associated class
    examName: { type: String, required: true },
    totalMarks: { type: Number, required: true }, // Total marks for the exam
    questions: [questionSchema], // Array of questions
    scheduledDate: { type: Date, required: true }, // Scheduled exam date
    duration: { type: Number, required: true }, // Duration in minutes
    maxAttempts: { type: Number, default: 3 }, // Maximum attempts allowed
    attempts: [attemptSchema], // Array of attempts by students
    notifications: [{ type: String }], // Notifications sent to students
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Teacher who created the exam
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User' }, // Last updated by
    updatedAt: { type: Date, default: Date.now }, // Timestamp for last update
}, { timestamps: true });

module.exports = mongoose.model('ExamModel', examSchema);
