const router = require("express").Router();
const Exam = require("../models/examModel");
const authMiddleware = require("../middlewares/authMiddleware");

// add exam route.
router.post("/add", authMiddleware, async (req, res) => {
  try {
    // check if exams already exists, duplicate exam names will not be allowed,.
    const existExam = await Exam.findOne({ name: req.body.name });
    if (existExam) {
      return res
        .status(200)
        .send({ message: "Exam Already Exists", success: false });
    }

    req.body.questions = []; // empty array of questions at the beginning.
    const newExam = new Exam(req.body);
    await newExam.save();
    res.send({
      message: "Exam added Successfully.",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// get all exams route.
router.post("/get-all-exams", authMiddleware, async (req, res) => {
  try {
    const exams = await Exam.find({});
    res.send({
      message: "Exam fetched successfully.",
      data: exams,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// get one single exam details by exam id.
router.post("/get-exam-by-id", authMiddleware, async (req, res) => {
  try {
    const exam = await Exam.findById(req.body.examId);
    res.send({
      message: "Exam fetched successfully.",
      data: exam,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});
module.exports = router;
