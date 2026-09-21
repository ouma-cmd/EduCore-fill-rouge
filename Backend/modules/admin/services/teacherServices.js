const user = require("../../auth/Models/user");
const SchoolClass = require("../Models/SchoolClass");
const Student = require("../Models/Student");
const Subject = require("../Models/subject");
const teacher = require("../Models/teacher");

async function ajouterteacherServices(userID, classeId, subjectId) {
  const userId = await user.findById(userID);
  const classeFind = await SchoolClass.findById(classeId);
  const subjectFind = await Subject.findById(subjectId);
  if (!userId || userId.role !== "teacher" || !classeFind || !subjectFind) {
    return null;
  }

  const teacherCreat = await teacher.create({
    user: userID,
    classe: [classeId],
    subjects: [subjectId],
  });
  // classe
  const mettreajourclasse = await SchoolClass.findByIdAndUpdate(
    classeId,
    {
      $addToSet: {
        teachers: teacherCreat._id,
      },
    },
    {
      new: true,
    },
  );

  return teacherCreat;
}
// get all teachre
async function getAllTeacherServices() {
  const getTeacher = await teacher
    .find()
    .populate("user", "username email")
    .populate("classe", "name level")
    .populate("subjects", "name");
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

// update
async function updateTeacher(id, username, email, classeId, subjectId) {
  const findTeachr = await teacher.findById(id);
  if (!findTeachr) {
    return null;
  }
  const updateUser = await user.findByIdAndUpdate(
    findTeachr.user,
    {
      username: username,
      email: email,
    },
    { new: true },
  );
  const classeUpdate = findTeachr.classe;
  const subjectUpdate = findTeachr.subjects;

  if (!classeUpdate || !subjectUpdate) {
    return null;
  }

  //   classe

  const oldClasse = await teacher.findByIdAndUpdate(id, {
    $pull: {
      classe: classeUpdate[0],
    },
  });
  const newClasse = await teacher.findByIdAndUpdate(id, {
    $addToSet: {
      classe: classeId,
    },
  });
  const oldClasseTeacher = await SchoolClass.findByIdAndUpdate(
    classeUpdate[0],
    {
      $pull: {
        teachers: id,
      },
    },
  );
  const updateTeach = await SchoolClass.findByIdAndUpdate(classeId, {
    $addToSet: {
      teachers: id,
    },
  });

  //   subject
  const oldSubject = await teacher.findByIdAndUpdate(id, {
    $pull: {
      subjects: subjectUpdate[0],
    },
  });
  const newSubject = await teacher.findByIdAndUpdate(id, {
    $addToSet: {
      subjects: subjectId,
    },
  });
  const oldSubjectTeacher = await Subject.findByIdAndUpdate(subjectUpdate[0], {
    $pull: {
      teachers: id,
    },
  });
  const updetTeach = await Subject.findByIdAndUpdate(subjectId, {
    $addToSet: {
      teachers: id,
    },
  });
  const newTeacherId = await teacher.findById(id);
  return newTeacherId;
}

// delet teacher
async function deleteTeacher(id) {
  const deleteTeacher = await teacher.findById(id);
  if (!deleteTeacher) {
    return null;
  }
  const studentdelet = await deleteTeacher.students;
  const classedelet = await deleteTeacher.classe;
  const subjectdelet = await deleteTeacher.subjects;

  for (let index = 0; index < studentdelet.length; index++) {
    const deletStudent = await Student.findByIdAndUpdate(studentdelet[index], {
      $pull: {
        teachers: id,
      },
    });
  }
  for (let index = 0; index < classedelet.length; index++) {
    const deletClasse = await SchoolClass.findByIdAndUpdate(
      classedelet[index],
      {
        $pull: {
          teachers: id,
        },
      },
    );
  }
  for (let index = 0; index < subjectdelet.length; index++) {
    const deletSubject = await Subject.findByIdAndUpdate(subjectdelet[index], {
      $pull: {
        teachers: id,
      },
    });
  }

  const deletteacherId = await teacher.findByIdAndDelete(id);
  return deletteacherId;
}

module.exports = {
  ajouterteacherServices,
  getAllTeacherServices,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
};
