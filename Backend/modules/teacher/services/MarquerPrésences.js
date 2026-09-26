const SchoolClass = require("../../admin/Models/SchoolClass");
const teacher = require("../../admin/Models/teacher");
const Attendance = require("../models/Attendance");

async function MarquerPrésences(
  classe,
  student,
  teacherUser,
  subjects,
  date,
  status,
) {
  const getTeacher = await teacher.findById(teacherUser);
  const getClasse = await SchoolClass.findById(classe);
  if (!getClasse) {
    return null;
  }
  const getStuent = getClasse.students;
  if (getStuent.length === 0) {
    return null;
  }

  const exist = getStuent.some(
    (studentId) => studentId.toString() === student.toString(),
  );
  if (!exist) {
    return null;
  }
  const existTeacher = getClasse.teachers.some(
    (teacherId) => teacherId.toString() === teacherUser.toString(),
  );
  if (!existTeacher) {
    return null;
  }
  const existSubject = getTeacher.subjects.some(
    (subjectId) => subjectId.toString() === subjects.toString(),
  );
  if (!existSubject) {
    return null;
  }
  console.log("CLASS:", getClasse._id);
  console.log("STUDENT:", student);
  console.log("CLASS STUDENTS:", getClasse.students);
  console.log("SUBJECT:", subjects);
  console.log("CLASS SUBJECTS:", getClasse.subjects);
  console.log("TEACHER:", teacherUser);
  console.log("CLASS TEACHERS:", getClasse.teachers);
  const creatAttendence = await Attendance.create({
    classe: getClasse._id,
    student: student,
    teacher: teacherUser,
    subjects,
    date,
    status,
  });
  return creatAttendence;
}

// afficher: Consulter l'historique des absences.
async function historAbsence(teacherId) {
  const teacherUser = await teacher.findById(teacherId);

  if (!teacherUser) {
    return null;
  }
  const attendances = await Attendance.find({
    student: { $in: teacherUser.students },
  })
    .populate("classe", "name")
    .populate("subjects", "name")
    .populate({
      path: "student",
      populate: {
        path: "user",
        select: "username",
      },
    });
  console.log("TEACHER:", teacherUser);
  return attendances;
}

module.exports = {
  MarquerPrésences,
  historAbsence,
};
