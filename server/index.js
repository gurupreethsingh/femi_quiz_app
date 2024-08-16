require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { body, validationResult } = require("express-validator");
const cors = require("cors");

// Models
const Teacher = require("./models/TeacherModel");
const Admin = require("./models/AdminModel");
// Assuming there's a Student model
const Student = require("./models/StudentModel");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Environment Variables
const JWT_SECRET = process.env.JWT_SECRET || "ecoders_jwt_secret_key";
const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mcdonald_trivan";

// Connect to MongoDB
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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
    const user =
      (await Admin.findById(decoded.user.id)) ||
      (await Teacher.findById(decoded.user.id));

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
      avatar: user.avatar || user.teacher_image || user.admin_image,
    };

    next();
  } catch (err) {
    console.error("Error authenticating user:", err);
    res.status(401).json({ message: "Token is not valid" });
  }
};

// Multer Storage Configuration for Teacher Image Upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadFolder = "uploads/teachers";
    if (!fs.existsSync(uploadFolder)) {
      fs.mkdirSync(uploadFolder, { recursive: true });
    }
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      `teacher-${req.user.id}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({
  storage,
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
});

// Register Teacher
app.post(
  "/teacher-register",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let teacher = await Teacher.findOne({ email });
      if (teacher) {
        return res.status(400).json({ message: "Teacher already exists" });
      }

      teacher = new Teacher({ name, email, password });
      const salt = await bcrypt.genSalt(10);
      teacher.password = await bcrypt.hash(password, salt);
      await teacher.save();

      res.status(201).json({ message: "Teacher registered successfully" });
    } catch (err) {
      console.error("Error registering teacher:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Register Admin
app.post(
  "/admin-register",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const { name, email, password } = req.body;

    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let admin = await Admin.findOne({ email });
      if (admin) {
        return res.status(400).json({ message: "Admin already exists" });
      }

      admin = new Admin({ name, email, password });
      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(password, salt);
      await admin.save();

      res.status(201).json({ message: "Admin registered successfully" });
    } catch (err) {
      console.error("Error registering admin:", err.message);
      res.status(500).json({ message: "Server error" });
    }
  }
);

// Admin Login
app.post("/admin-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        avatar: admin.admin_image,
        role: admin.role,
      },
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: payload.user });
  } catch (err) {
    console.error("Error logging in admin:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Teacher Login
app.post("/teacher-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, teacher.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email,
        avatar: teacher.teacher_image,
        role: teacher.role,
      },
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: payload.user });
  } catch (err) {
    console.error("Error logging in teacher:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Student Login
app.post("/student-login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, student.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: student._id,
        name: student.name,
        email: student.email,
        avatar: student.student_image,
        role: student.role,
      },
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });

    res.json({ token, user: payload.user });
  } catch (err) {
    console.error("Error logging in student:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Generic Logout Endpoint
app.post("/logout", authenticateUser, (req, res) => {
  res.json({ message: "Logged out successfully" });
});

// Fetch and Count All Users (Admins, Teachers, Students)
app.get("/api/all-users", authenticateUser, async (req, res) => {
  try {
    // Fetch the counts for Admins, Teachers, and Students
    const [adminCount, teacherCount, studentCount] = await Promise.all([
      Admin.countDocuments(),
      Teacher.countDocuments(),
      Student.countDocuments(), // Include Student count
    ]);

    // Calculate total users
    const totalUsers = adminCount + teacherCount + studentCount;

    res.json({
      admins: adminCount,
      teachers: teacherCount,
      students: studentCount,
      totalUsers: totalUsers,
    });
  } catch (err) {
    console.error("Error fetching user counts:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch All Teachers
app.get("/api/all-teachers", authenticateUser, async (req, res) => {
  try {
    const teachers = await Teacher.find().select("-password");
    res.json(teachers);
  } catch (err) {
    console.error("Error fetching teachers:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch All Admins
app.get("/api/all-admins", authenticateUser, async (req, res) => {
  try {
    const admins = await Admin.find().select("-password");
    res.json(admins);
  } catch (err) {
    console.error("Error fetching admins:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Fetch All Students
app.get("/api/all-students", authenticateUser, async (req, res) => {
  try {
    const students = await Student.find().select("-password");
    res.json(students);
  } catch (err) {
    console.error("Error fetching students:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
