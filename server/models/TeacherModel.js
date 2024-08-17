const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const teacherSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String }, // Optional
    address: { type: String }, // Optional
    designation: { type: String }, // e.g., Professor, Assistant Professor, Lecturer - Optional
    department: { type: String }, // Department the teacher belongs to - Optional
    role: { type: String, default: "teacher" }, // Optional
    teacher_image: { type: String }, // URL or file path for the profile image - Optional
    qualification: { type: String }, // e.g., Ph.D., M.Sc., B.Ed. - Optional
    experience: { type: Number }, // Number of years of teaching experience - Optional
    courses: [{ type: String }], // List of courses the teacher is currently teaching - Optional
    research_papers: [
      {
        title: { type: String },
        journal: { type: String },
        year: { type: Number },
      },
    ], // List of research papers published by the teacher - Optional
    office_hours: {
      start_time: { type: String }, // e.g., "09:00 AM" - Optional
      end_time: { type: String }, // e.g., "05:00 PM" - Optional
      days: [{ type: String }], // e.g., ["Monday", "Wednesday", "Friday"] - Optional
    }, // Office hours for meeting students - Optional
    assigned_classes: [
      {
        class_id: { type: Schema.Types.ObjectId, ref: "Class" },
        subject: { type: String },
      },
    ], // Classes and subjects assigned to the teacher - Optional
    joining_date: { type: Date, default: Date.now }, // Date when the teacher joined the institution, default value is now
    achievements: [
      {
        title: { type: String },
        description: { type: String },
        date: { type: Date },
      },
    ], // List of professional achievements or awards - Optional
    supervisor: { type: Schema.Types.ObjectId, ref: "Teacher" }, // Reference to another teacher if this teacher is being supervised - Optional
    salary: {
      base: { type: Number }, // Optional
      bonuses: { type: Number }, // Optional
    }, // Salary details including base pay and bonuses - Optional
    leaves: [
      {
        type: { type: String }, // e.g., "Sick Leave", "Casual Leave" - Optional
        start_date: { type: Date },
        end_date: { type: Date },
        status: { type: String, enum: ["Pending", "Approved", "Rejected"] },
      },
    ], // Leave records for the teacher - Optional
    specializations: [{ type: String }], // Areas of expertise or specialized subjects - Optional
    memberships: [
      {
        organization: { type: String },
        role: { type: String },
        since: { type: Date },
      },
    ], // Professional memberships or societies - Optional
    certifications: [
      {
        name: { type: String },
        institution: { type: String },
        date_obtained: { type: Date },
      },
    ], // Certifications or training programs completed - Optional

    status: { type: String, enum: ["Pending", "Approved"], default: "Pending" }, // New status field with default value "Pending"
    notifications: [notificationSchema], // Notifications array to store messages
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model("Teacher", teacherSchema);
