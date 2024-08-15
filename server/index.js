require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs-extra");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");
const cors = require("cors");

// Models
const User = require("./models/User");
const Class = require("./models/ClassesModel");
const Exam = require("./models/ExamModel");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Environment Variables
const JWT_SECRET = process.env.JWT_SECRET || "ecoders_jwt_secret";
const RESET_PASSWORD_SECRET =
  process.env.RESET_PASSWORD_SECRET || "ecoders_reset_password_secret";
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mcdonal_tivan";
const EMAIL_USER = process.env.EMAIL_USER || "emailer.ecoders@gmail.com";
const EMAIL_PASS = process.env.EMAIL_PASS || "Ec0d3rs1!";

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Unable to connect to MongoDB", err));

// Middleware to authenticate and attach user info
const authenticateUser = async (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.user.id);

    if (!user) {
      return res
        .status(401)
        .json({ message: "User not found, authorization denied" });
    }

    req.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.user_image,
    };

    next();
  } catch (err) {
    console.error("Error authenticating user:", err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadFolder = "uploads/";

    // Determine the folder based on role
    if (req.user && req.user.role) {
      if (req.user.role === "admin") {
        uploadFolder += "admins";
      } else if (req.user.role === "teacher") {
        uploadFolder += "teachers";
      } else if (req.user.role === "student") {
        uploadFolder += "students";
      } else {
        uploadFolder += "users";
      }
    } else {
      uploadFolder += "users";
    }

    // Ensure the folder exists
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }

    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|webp|png|gif/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only images are allowed!"));
    }
  },
});

app.post("/register", async (req, res) => {
  const { name, email, password, phone, address, designation, role } = req.body;

  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user instance with the provided data
    user = new User({
      name,
      email,
      password,
      phone,
      address,
      designation,
      role,
    });

    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save the user to the database
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error registering user:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.error("User not found with email:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error("Password mismatch for user:", email);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.user_image,
        role: user.role,
      },
    };

    // Generate JWT token
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: payload.user });
  } catch (err) {
    console.error("Error logging in user:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/logout", authenticateUser, (req, res) => {
  res.json({ message: "Logged out successfully" });
});

// Protected Routes for Projects, Courses, Exams
app.get("/projects", authenticateUser, async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.id });
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/courses", authenticateUser, async (req, res) => {
  try {
    const courses = await Course.find({ userId: req.user.id });
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/exams", authenticateUser, async (req, res) => {
  try {
    const exams = await Exam.find({ userId: req.user.id });
    res.json(exams);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No user found with this email" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const tokenExpiration = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = tokenExpiration;
    await user.save();

    const resetUrl = `http://localhost:5000/reset-password/${resetToken}`;
    const message = `
            <h1>Password Reset Request</h1>
            <p>You have requested a password reset. Please click on the following link to reset your password:</p>
            <a href="${resetUrl}" clicktracking=off>${resetUrl}</a>
            <p>If you did not request this, please ignore this email.</p>
        `;

    await transporter.sendMail({
      to: user.email,
      subject: "Password Reset Request",
      html: message,
    });

    res
      .status(200)
      .json({ message: "Password reset link has been sent to your email" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();
    res.status(200).json({
      message:
        "Password has been reset successfully. You can now log in with your new password.",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

app.get("/reset-password/:token", (req, res) => {
  const { token } = req.params;
  res.send(`<form action="/reset-password/${token}" method="POST">
        <input type="password" name="newPassword" placeholder="Enter your new password" required />
        <button type="submit">Reset Password</button>
    </form>`);
});

// Getting all the users from the database.
app.get("/api/all-users", authenticateUser, async (req, res) => {
  try {
    const users = await User.find(); // Assuming you have a User model
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Profile

// API route to get user profile data
app.get("/api/user/profile", authenticateUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

app.put(
  "/updateUser",
  authenticateUser,
  upload.single("user_image"),
  async (req, res) => {
    try {
      const { name, email, password, phone, address, designation, role } =
        req.body;

      const updates = {
        name,
        email,
        phone,
        address,
        designation,
        role,
      };

      // If password is provided, hash it
      if (password) {
        const salt = await bcrypt.genSalt(10);
        updates.password = await bcrypt.hash(password, salt);
      }

      // Debugging: Check if file is received
      console.log("Received file:", req.file);

      // Handle profile image upload
      if (req.file) {
        updates.user_image = req.file.path;
        console.log("Profile image uploaded:", req.file.path);
      }

      // Update user in the database
      const updatedUser = await User.findByIdAndUpdate(req.user.id, updates, {
        new: true,
      });

      console.log("User updated successfully");
      res.status(200).json(updatedUser);
    } catch (err) {
      console.error("Error updating user:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
