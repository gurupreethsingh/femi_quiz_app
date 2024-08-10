const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    designation: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin', 'teacher', 'student', 'hr'], default: 'user' },
    profileImage: { type: String }, // URL or file path for the profile image
    backgroundImage: { type: String }, // URL or file path for the background image
    images: [{ type: String }], // Array to store URLs or file paths for additional images
}, {
    timestamps: true // Automatically add createdAt and updatedAt timestamps
});

module.exports = mongoose.model('User', userSchema);
