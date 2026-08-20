const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const ParentSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
},{ timestamps: true });

module.exports = mongoose.model("Parent", ParentSchema);
    