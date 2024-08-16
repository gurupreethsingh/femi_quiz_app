const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roll_number: { type: String, required: true, unique: true }, // Unique roll number for the student
    phone: { type: String }, // Optional
    address: { type: String }, // Optional
    date_of_birth: { type: Date }, // Optional
    gender: { type: String, enum: ["Male", "Female", "Other"] }, // Optional, gender of the student
    profile_image: { type: String }, // URL or file path for the profile image - Optional
    enrollment_date: { type: Date, default: Date.now }, // Date when the student enrolled, default value is now
    department: { type: String }, // Department the student belongs to - Optional
    course: { type: String }, // Course the student is enrolled in - Optional
    year_of_study: { type: Number }, // Current year of study, e.g., 1st year, 2nd year - Optional
    subjects: [{ type: String }], // List of subjects the student is currently studying - Optional
    guardian_details: {
      name: { type: String },
      phone: { type: String },
      relation: { type: String },
    }, // Guardian details - Optional
    scholarships: [
      {
        name: { type: String },
        amount: { type: Number },
        awarded_date: { type: Date },
      },
    ], // Scholarships received by the student - Optional
    extracurricular_activities: [
      {
        activity: { type: String },
        role: { type: String },
        achievement: { type: String },
      },
    ], // Extracurricular activities - Optional
    grades: [
      {
        subject: { type: String },
        exam_id: { type: Schema.Types.ObjectId, ref: "Exam" },
        marks_obtained: { type: Number },
        grade: { type: String },
      },
    ], // Grades obtained in various subjects - Optional
    attendance: [
      {
        subject: { type: String },
        date: { type: Date },
        status: { type: String, enum: ["Present", "Absent"] },
      },
    ], // Attendance records for each subject - Optional
    fee_details: [
      {
        fee_type: { type: String }, // e.g., Tuition, Hostel, etc.
        amount: { type: Number },
        due_date: { type: Date },
        status: { type: String, enum: ["Paid", "Unpaid"] },
      },
    ], // Fee payment details - Optional
    disciplinary_actions: [
      {
        action: { type: String },
        date: { type: Date },
        remarks: { type: String },
      },
    ], // Records of any disciplinary actions - Optional
    internship_details: [
      {
        company: { type: String },
        role: { type: String },
        start_date: { type: Date },
        end_date: { type: Date },
        supervisor: { type: String },
        remarks: { type: String },
      },
    ], // Internship details - Optional
    projects: [
      {
        title: { type: String },
        description: { type: String },
        technology_used: [{ type: String }],
        completion_date: { type: Date },
        grade: { type: String },
      },
    ], // Academic projects completed by the student - Optional
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model("Student", studentSchema);
