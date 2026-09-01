const SchoolClass = require("../../admin/Models/SchoolClass");
const Student = require("../../admin/Models/Student");
const teacher = require("../../admin/Models/teacher");
const Grade = require("../models/Grade");

async function ajouterNote(
  classe,
  student,
  teacher,
  subject,
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
  const existTeachr = findClasse.teachers.some(
    (teachers) => teachers.toString() === teacher.toString(),
  );
  if (!existTeachr) {
    return null;
  }
  const creatGrad = Grade.create({
    classe,
    student,
    teacher,
    subject,
    score,
    semester,
    examType,
  });
  return creatGrad;
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

async function moyenneNote(id) {
  const gridFind = await Grade.findById(id);

  if (!gridFind) {
    return null;
  }
  const classeFind = gridFind.classe;
  const teacherFind = gridFind.teacher;
  const subjectFind = gridFind.subject;
  const studentfind = gridFind.student;
  if (!classeFind || !teacherFind || !subjectFind || !studentfind) {
    return null;
  }

  const typeExameFind = gridFind.examType;
  if (typeExameFind !== "controller") {
    return null;
  }

  const groupScore = await Grade.aggregate([
    {
      $match: {
        student: studentfind,
        classe: classeFind,
        teacher: teacherFind,
        subject: subjectFind,
        examType: typeExameFind,
      },
    },
    {
      $group: {
        _id: "$student",
        totaleAvg: { $avg: "$score" },
      },
    },
  ]);
  return groupScore;
}

module.exports = {
  ajouterNote,
  updateNote,
  moyenneNote,
};
