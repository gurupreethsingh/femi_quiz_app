require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const fs = require("fs-extra");
const path = require("path");
const sharp = require("sharp");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const { body, validationResult } = require("express-validator");

// Models
const User = require("./models/User");
const Class = require("./models/ClassesModel");
const Exam = require("./models/ExamModel");

const app = express();
app.use(express.json());

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
      username: user.username,
      email: user.email,
      role: user.role,
      avatar: user.avatar,
    };

    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const username = req.user.username;
    const userDir = path.join(__dirname, "uploads", username);

    if (!fs.existsSync(userDir)) {
      fs.mkdirSync(userDir, { recursive: true });
    }

    cb(null, userDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { files: 5 },
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
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
}).fields([
  { name: "profileImage" },
  { name: "backgroundImage" },
  { name: "images" },
]);

// Function to compress images using sharp
const compressImage = async (filePath) => {
  const compressedFilePath = filePath.replace(
    path.extname(filePath),
    "-compressed.jpg"
  );
  await sharp(filePath)
    .resize(800)
    .jpeg({ quality: 80 })
    .toFile(compressedFilePath);
  await fs.unlink(filePath);
  return compressedFilePath;
};

// Routes for User Management
app.post(
  "/register",
  [
    body("email").isEmail().withMessage("Enter a valid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("name").not().isEmpty().withMessage("Name is required"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      user = new User({ name, email, password });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();
      res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: payload.user });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/logout", authenticateUser, (req, res) => {
  res.json({ message: "Logged out successfully" });
});

app.get("/users", authenticateUser, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
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
    res
      .status(200)
      .json({
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

// Routes for Class Management (similar to your current implementation)
// Consider splitting this into its own route file

// Routes for Exam Management (similar to your current implementation)
// Consider splitting this into its own route file

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
