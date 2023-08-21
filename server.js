const express = require("express");
const app = express();
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const Users = require("./models/users");

dotenv.config();

mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true });
const con = mongoose.connection;

con.on("open", () => console.log("Database Connected!"));

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
  }
});
app.get("/users", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/users", async (req, res) => {
  const newUserData = new Users({
    name: req.body.name,
    age: req.body.age,
    married: req.body.married,
  });

  try {
    const newUSer = await newUserData.save();
    res.status(200).json(newUSer);
  } catch (error) {
    console.log(error);
  }
});

app.put("/users/:userId", async (req, res) => {
  const userId = req.params.userId;
  const newName = req.body.name;

  try {
    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    user.name = newName;
    await user.save();
    const updatedUsers = await Users.find();
    res.status(200).json(updatedUsers);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.delete("/users/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await Users.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found!" });
    }
    const updatedUsers = await Users.find();
    res.status(200).json({
      message: "User deleted successfully!",
      updatedUsers: updatedUsers,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
