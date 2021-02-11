const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const path = require("path");
const PORT = process.env.PORT || 3000;

const Workout = require("./models/workout.js");
const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/Workout", { useNewUrlParser: true, useFindAndModify: false });


app.get("/", (req, res)=> {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/exercise", (req, res)=> {
    res.sendFile(path.join(__dirname, "./public/exercise.html"));
});

app.get("/stats", (req, res)=> {
    res.sendFile(path.join(__dirname, "./public/stats.html"));
});

app.get("/api/workouts", (req, res)=> {
    Workout.find()
    .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
});

// app.put("/api/workouts/" + id, (req, res)=> {
//     Workout.update()
//     .then(dbWorkout => {
//         res.json(dbWorkout);
//       })
//       .catch(err => {
//         res.json(err);
//       });
// });

app.post("/api/workouts/", (req, res)=> {
    Workout.create()
    .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
});

// app.post("/submit", ({ body }, res) => {
//   User.create(body)
//     .then(dbUser => {
//       res.json(dbUser);
//     })
//     .catch(err => {
//       res.json(err);
//     });
// });

app.post("/update/:id", (req, res) => {
    db.notes.update(
      {
        _id: mongojs.ObjectId(req.params.id)
      },
      {
        $set: {
          title: req.body.title,
          note: req.body.note,
          modified: Date.now()
        }
      },
      (error, data) => {
        if (error) {
          res.send(error);
        } else {
          res.send(data);
        }
      }
    );
  });


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});


