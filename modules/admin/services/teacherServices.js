const user = require("../../auth/Models/user");
const SchoolClass = require("../Models/SchoolClass");
const Student = require("../Models/Student");
const subject = require("../Models/subject");
const teacher = require("../Models/teacher");

async function ajouterteacherServices(userID, classeId, subjectId, studentId) {
  const userId = await user.findById(userID);
  const classeFind = await SchoolClass.findById(classeId);
  const studentFind = await Student.findById(studentId);

  if (!userId || userId.role !== "teacher" || !classeFind || !studentFind) {
    return null;
  }

  const teacherCreat = await teacher.create({
    user: userID,
    classe: [classeId],
    subjects: [subjectId],
    students: [studentId],
  });

  return teacherCreat;
}

async function getAllTeacherServices() {
  const getTeacher = await teacher.find();
  if (!getTeacher) {
    return null;
  }
  return getTeacher;
}

async function getTeacherById(id) {
  const findTeacher = await teacher.findById(id);
  if (!findTeacher) {
    return null;
  }
  return findTeacher;
}

async function updateTeacher(id, newTeacher, studentId, classeId, subjectId) {
  const findTeachr = await teacher.findById(id);
  if (!findTeachr) {
    return null;
  }
  const studentUpdate = await findTeachr.Student(studentId);
  const classeUpdate = await findTeachr.SchoolClass(classeId);
  const subjectUpdate = await findTeachr.subject(subjectId);

  if (!studentUpdate || !classeUpdate || !subjectUpdate) {
    return null;
  }

  //   student
  for (let index = 0; index < studentUpdate.length; index++) {
    const oldStudent = await teacher.findByIdAndUpdate(id[index], {
      $pull: {
        studens: studentId,
      },
    });
  }

  const newStudent = await teacher.findByIdAndUpdate(newTeacher, {
    $addToSet: {
      studens: studentId,
    },
  });
  const updateTeacher = await Student.findByIdAndUpdate(studentId, {
    teachers: [newTeacher],
  });

  //   classe

  for (let index = 0; index < classeUpdate.length; index++) {
    const oldClasse = await teacher.findByIdAndUpdate(id[index], {
      $pull: {
        classe: classeId,
      },
    });
  }
  const newClasse = await teacher.findByIdAndUpdate(newTeacher, {
    $addToSet: {
      classe: classeId,
    },
  });
  const updateTeach = await SchoolClass.findByIdAndUpdate(classeId, {
    $set: {
      teachers: [newTeacher],
    },
  });

  //   subject
  for (let index = 0; index < subjectUpdate.length; index++) {
    const oldSubject = await teacher.findByIdAndUpdate(id[index], {
      $pull: {
        subjects: subjectId,
      },
    });
  }
  const newSubject = await teacher.findByIdAndUpdate(newTeacher, {
    $addToSet: {
      subjects: subjectId,
    },
  });
  const updetTeach = await subject.findByIdAndUpdate(subjectId, {
    $set: {
      teachers: [newTeacher],
    },
  });
  const newTeacherId = await teacher.findById(newTeacher);
  return newTeacherId;
}

async function deleteTeacher(id, studentId, classeId, subjectId) {
  const deleteTeacher = await teacher.findById(id);
  if (!deleteTeacher) {
    return null;
  }
  const studentdelet = await deleteTeacher.Student(studentId);
  const classedelet = await deleteTeacher.SchoolClass(classeId);
  const subjectdelet = await deleteTeacher.subject(subjectId);

  for (let index = 0; index < studentdelet.length; index++) {
    const deletStudent = await Student.findByIdAndUpdate(studentId[index], {
      $pull: {
        teachers: id,
      },
    });
  }
  for (let index = 0; index < classedelet.length; index++) {
    const deletClasse = await SchoolClass.findByIdAndUpdate(classeId[index], {
      $pull: {
        teachers: id,
      },
    });
  }
  for (let index = 0; index < subjectdelet.length; index++) {
    const deletSubject = await subject.findByIdAndUpdate(subjectId[index], {
      $pull: {
        teachers: id,
      },
    });
  }
  const deletteacherId = await teacher.findById(id);
  return deletteacherId;
}

module.exports = {
  ajouterteacherServices,
  getAllTeacherServices,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};
