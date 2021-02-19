const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();

const path = require("path");
const PORT = process.env.PORT || 4000;

const Workout = require("./models/workout.js");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", 
{ useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(()=>console.log("connected", process.env.MONGODB_URI)).catch(err=>console.log(err));

app.get("/", (req, res)=> {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/exercise", (req, res)=> {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res)=> {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.get("/api/workouts/", (req, res)=> {

  Workout.aggregate([
    {
      "$addFields": {
        "totalDuration": {
          "$sum": "$exercises.duration",
        },
      },
    },
  ])
  // .sort({ date: -1 })
    .then((dbWorkout) => {
      console.log(dbWorkout);
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.post("/api/workouts/", (req, res)=> {
    Workout.create({})
    .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
});

app.get("/api/workouts/range", (req, res) => {
  // Workout.find({})
  Workout.aggregate([
    {
      "$addFields": {
        "totalDuration": {
          "$sum": "$exercises.duration",
        },
      },
    },
  ])
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});



app.put("/api/workouts/:id", (req, res) => {
  Workout.findByIdAndUpdate(
    req.params.id,
    {
      $push: { exercises: req.body },
    },
    {
      new: true,
    }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});


app.listen(PORT, () => {
  console.log(`App running on port http://localhost:${PORT}`);
});


