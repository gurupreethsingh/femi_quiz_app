const express = require("express");
const app = express();
const cors = require("cors");

require("dotenv").config();
const mongoose = require("mongoose");
app.use(express.json());
app.use(cors());

const usersRoute = require("./routes/userRoute");
app.use("/api/users", usersRoute);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB successfully.");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server successfully running at port ${port}`);
});
