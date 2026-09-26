const mongoose = require("mongoose");
const SchoolClass = require("../../admin/Models/SchoolClass");
const teacher = require("../../admin/Models/teacher");
const Grade = require("../models/Grade");

async function ajouterNote(
  classe,
  student,
  subject,
  Teachers,
  score,
  semester,
  examType,
) {
  const findClasse = await SchoolClass.findById(classe);
  if (!findClasse) {
    return null;
  }
  const fincdStudent = findClasse.students;
  if (fincdStudent.length === 0) {
    return null;
  }
  const exist = fincdStudent.some(
    (students) => students.toString() === student.toString(),
  );

  if (!exist) {
    return null;
  }

  const creatGrad = await Grade.create({
    classe,
    student,
    subject,
    teacher: Teachers._id,
    score,
    semester,
    examType,
  });
  return creatGrad;
}

async function getGrade(user) {
  const teacherUser = await teacher.findOne({ user: user });

  console.log("TEACHER DOCUMENT:", teacherUser);

  if (!teacherUser) {
    return null;
  }

  console.log("REAL TEACHER ID:", teacherUser._id);

  const teachers = await Grade.find({
    teacher: teacherUser._id,
  })
    .populate({
      path: "student",
      populate: {
        path: "user",
        select: "username",
      },
    })
    .populate("classe", "name")
    .populate("subject", "name");

  console.log("GRADES FROM DB:", teachers);

  return teachers;
}

async function updateNote(id, score, semester, examType) {
  const updateGrad = await Grade.findByIdAndUpdate(
    id,
    {
      score,
      semester,
      examType,
    },
    { new: true },
  );
  return updateGrad;
}
async function moyenneNote(student, classe, subject) {
  const groupScore = await Grade.aggregate([
    {
      $match: {
        student: new mongoose.Types.ObjectId(student),
        classe: new mongoose.Types.ObjectId(classe),
        subject: new mongoose.Types.ObjectId(subject),
      },
    },
    {
      $group: {
        _id: {
          semester: "$semester",
          examType: "$examType",
        },
        moyenne: { $avg: "$score" },
      },
    },
  ]);

  return groupScore;
}

module.exports = {
  ajouterNote,
  getGrade,
  updateNote,
  moyenneNote,
};
