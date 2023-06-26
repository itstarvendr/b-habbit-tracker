// server.js

const express = require("express");
const mongoose = require("mongoose");
const app = express();

// Connect to MongoDB
mongoose.connect("mongodb://localhost/habits", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create the habit model
const Habit = mongoose.model("Habit", {
  name: String,
  description: String,
  trackedDays: Number,
});

// Create the routes
app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/habits", (req, res) => {
  const habit = new Habit({
    name: req.body.name,
    description: req.body.description,
  });

  habit.save((err, habit) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.redirect("/");
    }
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
