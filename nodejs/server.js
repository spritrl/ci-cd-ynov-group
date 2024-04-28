const express = require("express");
var cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = mongoose.model("User", {
  name: String,
  surname: String,
  email: String,
  birthDate: String,
  city: String,
  postalCode: String,
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/users", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

app.delete("/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

app.listen(3001, () => {
  console.log("Node.js API listening on port 3001");
});
