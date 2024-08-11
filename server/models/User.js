const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    designation: { type: String },
    role: {
      type: String,
      enum: ["user", "admin", "teacher", "student", "hr"],
      default: "user",
    },
    profileImage: { type: String }, // URL or file path for the profile image
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt timestamps
  }
);

module.exports = mongoose.model("User", userSchema);
