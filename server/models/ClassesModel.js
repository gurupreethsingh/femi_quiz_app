const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema(
  {
    className: { type: String, required: true },
    subjects: [{ type: String, required: true }], // Array of subjects
    teachers: [{ type: Schema.Types.ObjectId, ref: "Teacher", required: true }], // Array of teachers
    students: [{ type: Schema.Types.ObjectId, ref: "Student" }], // Array of students
    exams: [{ type: Schema.Types.ObjectId, ref: "Exam" }], // Array of exams
    duration: {
      type: String,
      enum: ["monthly", "half-yearly", "yearly"],
      required: true,
    }, // Class duration
    schedule: {
      days: [
        {
          type: String,
          enum: [
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday",
          ],
        },
      ], // Class days
      time: { type: String }, // Class time (e.g., "10:00 AM - 12:00 PM")
    },
    room: { type: String }, // Room or location where the class takes place
    maxCapacity: { type: Number }, // Maximum number of students allowed in the class
    isActive: { type: Boolean, default: true }, // Whether the class is currently active
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true }, // User who created the class
    updatedBy: { type: Schema.Types.ObjectId, ref: "User" }, // User who last updated the class
    deletedBy: { type: Schema.Types.ObjectId, ref: "User" }, // User who deleted the class
    logs: [
      {
        action: { type: String, required: true }, // e.g., "created", "updated", "deleted"
        user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // User who performed the action
        timestamp: { type: Date, default: Date.now }, // When the action was performed
      },
    ],
    deletedAt: { type: Date }, // Timestamp for when the class was deleted
    updatedAt: { type: Date }, // Timestamp for when the class was last updated
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);
