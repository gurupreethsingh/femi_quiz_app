const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attendanceSchema = new Schema(
  {
    student_id: { type: Schema.Types.ObjectId, ref: "Student", required: true }, // Reference to the student
    class_id: { type: Schema.Types.ObjectId, ref: "Class", required: true }, // Reference to the class
    subject: { type: String, required: true }, // Subject for which attendance is recorded
    date: { type: Date, required: true, default: Date.now }, // Date of the attendance record
    status: {
      type: String,
      enum: ["Present", "Absent", "Late", "Excused"],
      required: true,
    }, // Attendance status
    recorded_by: { type: Schema.Types.ObjectId, ref: "Teacher" }, // Reference to the teacher who recorded the attendance
    attendance_type: {
      type: String,
      enum: ["Lecture", "Lab", "Seminar", "Exam", "Other"],
      default: "Lecture",
    }, // Type of attendance session
    location: { type: String }, // Location where the attendance was recorded
    duration: { type: Number, min: 0 }, // Duration of the class/session in minutes
    remarks: { type: String }, // Optional field for additional remarks or comments
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
