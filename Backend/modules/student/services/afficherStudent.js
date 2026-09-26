const Attendance = require("../../teacher/models/Attendance");
const Grade = require("../../teacher/models/Grade");
const Student = require("../../admin/Models/Student");
const { patch } = require("../routes/student.routes");

async function consulterNote(userId) {
  const findStudent = await Student.findOne({ user: userId });

  if (!findStudent) {
    return null;
  }

  const findGrades = await Grade.find({
    student: findStudent._id,
  })
    .populate("subject")
    .populate("classe")
    .populate({
      path: "teacher",
      populate: {
        path: "user",
      },
    });

  if (findGrades.length === 0) {
    return null;
  }

  return findGrades;
}

async function consulterAbsence(userId) {
  const findStudent = await Student.findOne({
    user: userId,
  });
  if (!findStudent) {
    return null;
  }
  const findAbsence = await Attendance.find({
    student: findStudent._id,
  })
    .populate("classe")
    .populate("subjects")
    .populate({
      path: "teacher",
      populate: {
        path: "user",
      },
    });
  if (findAbsence.length === 0) {
    return null;
  }
  return findAbsence;
}

module.exports = {
  consulterNote,
  consulterAbsence,
};
