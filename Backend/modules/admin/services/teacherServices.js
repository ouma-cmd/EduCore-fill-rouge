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
  const findTeacher = await teacher.findById(id);

  if (!findTeacher) {
    return null;
  }

  // Vérifier les nouvelles données
  const newClasse = await SchoolClass.findById(classeId);
  const newSubject = await Subject.findById(subjectId);

  if (!newClasse || !newSubject) {
    return null;
  }

  // Modifier username + email
  await user.findByIdAndUpdate(
    findTeacher.user,
    {
      username,
      email,
    },
    { new: true },
  );

  // CLASSE

  const oldClasseId = findTeacher.classe[0];

  // Supprimer teacher de l'ancienne classe
  if (oldClasseId) {
    await SchoolClass.findByIdAndUpdate(oldClasseId, {
      $pull: {
        teachers: id,
      },
    });
  }

  // Ajouter teacher dans la nouvelle classe
  await SchoolClass.findByIdAndUpdate(classeId, {
    $addToSet: {
      teachers: id,
    },
  });

  // Remplacer classe dans Teacher
  await teacher.findByIdAndUpdate(id, {
    $set: {
      classe: [classeId],
    },
  });

  // SUBJECT
  const oldSubjectId = findTeacher.subjects[0];
  // Supprimer teacher de l'ancien subject
  if (oldSubjectId) {
    await Subject.findByIdAndUpdate(oldSubjectId, {
      $pull: {
        teachers: id,
      },
    });
  }
  // Ajouter teacher dans le nouveau subject
  await Subject.findByIdAndUpdate(subjectId, {
    $addToSet: {
      teachers: id,
    },
  });
  // Remplacer subject dans Teacher
  await teacher.findByIdAndUpdate(id, {
    $set: {
      subjects: [subjectId],
    },
  });

  const updatedTeacher = await teacher.findById(id);

  return updatedTeacher;
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
