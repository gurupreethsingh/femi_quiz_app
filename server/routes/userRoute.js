const router = require("express").Router();
const UserModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middlewares/authMiddleware");

// route for register
router.post("/register", async (req, res) => {
  try {
    const userExists = await UserModel.findOne({ email: req.body.email });

    if (userExists) {
      return res
        .status(200)
        .send({ message: "User already exists", success: false });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;

    const newUser = new UserModel(req.body); // Use UserModel here
    await newUser.save();
    res.send({
      message: "User created successfully.",
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

// route for login
router.post("/login", async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exists", success: false });
    }
    // if the user is existing check if his entered password and the hashedPAssword from the database are same or not.
    const validPassword = await bcrypt.compare(
      // password entered by the user.
      req.body.password,
      // password from the database
      user.password
    );
    if (!validPassword) {
      return res
        .status(200)
        .send({ message: "Credentails did not match.", success: false });
    }

    // if the password is matching, then create the token,
    const token = jwt.sign(
      // we will encrypt only the userid. , not the entire user data.
      {
        userId: user._id,
      },
      // now we will need a secret JWT key, to encrypt and decrypt.
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.send({
      message: "User logged in successfully.",
      success: true,
      data: token,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
});

// route to get the user info, who has logged in.
router.post("/get-user-info", authMiddleware, async (req, res) => {
  try {
    const user = await UserModel.findById(req.body.userId);
    res.send({
      message: "User info fetched successfully,",
      success: true,
      data: user,
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
