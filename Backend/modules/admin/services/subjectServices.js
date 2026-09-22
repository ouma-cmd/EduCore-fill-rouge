const parent = require("../Models/parent");
const Student = require("../Models/Student");
const subject = require("../Models/subject");
const teacher = require("../Models/teacher");

async function ajouterSubjecteServices(name, teachers, coefficient) {
  const ajouterSubject = await subject.find({ name: name });
  if (ajouterSubject.length > 0) {
    return null;
  }
  const creatSubject = await subject.create({
    name,
    teachers,
    coefficient,
  });
  return creatSubject;
}

async function getAllSubject() {
  const getAllSubject = await subject.find().populate({
    path: "teachers",
    populate: {
      path: "user",
      select: "username email",
    },
  });
  if (!getAllSubject) {
    return null;
  }
  return getAllSubject;
}

async function getSubjectById(id) {
  const getsubject = await subject.findById(id);
  if (!getsubject) {
    return null;
  }
  return getsubject;
}

async function modiffierSubjectServices(id, name, newTeacher, coefficient) {
  const findSubject = await subject.findById(id);

  if (!findSubject) {
    return null;
  }

  const oldTeacher = findSubject.teachers[0];

  if (oldTeacher) {
    await teacher.findByIdAndUpdate(oldTeacher, {
      $pull: {
        subjects: id,
      },
    });
  }

  await teacher.findByIdAndUpdate(newTeacher, {
    $addToSet: {
      subjects: id,
    },
  });

  const updatedSubject = await subject.findByIdAndUpdate(
    id,
    {
      name,
      coefficient,
      teachers: [newTeacher],
    },
    {
      new: true,
    },
  );

  return updatedSubject;
}

async function deletSubjectServices(id) {
  const deletSubject = await subject.findById(id);
  if (!deletSubject) {
    return null;
  }
  const studentD = deletSubject.students;
  const teacherD = deletSubject.teachers;
  for (let index = 0; index < studentD.length; index++) {
    const deletStudent = await Student.findByIdAndUpdate(studentD[index], {
      $pull: {
        subjects: id,
      },
    });
  }
  for (let index = 0; index < teacherD.length; index++) {
    const deletteacher = await teacher.findByIdAndUpdate(teacherD[index], {
      $pull: {
        subjects: id,
      },
    });
  }
  const deletSubjectD = await subject.findByIdAndDelete(id);
  return deletSubjectD;
}

module.exports = {
  ajouterSubjecteServices,
  getAllSubject,
  getSubjectById,
  modiffierSubjectServices,
  deletSubjectServices,
};
