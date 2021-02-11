const mongoose = require("mongoose");
const { type } = require("os");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    trim: true,
    required: "Date is Required",
    default: Date.now
  },

  exercises: [
    {type: {
        type: String,
        trim: true,
        required: "Exercise type is required",
    },
    name: {
        type: String,
        trim: true,
        required: "Exercise Name is required",
    },

    duration: {
        type: Number,
        trim: true,
        required: "Duration is required",
    },

    weight: {
        type: Number,
        trim: true
    },

    reps: {
        type: Number,
        trim: true
    },

    sets: {
        type: Number,
        trim: true
    },

    distance: {
        type: Number,
        trim: true
    }
    }]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
