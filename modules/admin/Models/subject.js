const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  teachers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
  ],
  students: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  coefficient: {
    type: Number,
    required: true,
    default: 1,
  },
});

module.exports = mongoose.model("Subject", SubjectSchema);
