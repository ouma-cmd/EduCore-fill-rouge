const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const TeacherSchema = new mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Subject",
      },
    ],
    classe: [
      {
        type: Schema.Types.ObjectId,
        ref: "SchoolClass",
      },
    ],
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: "students",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Teacher", TeacherSchema);
