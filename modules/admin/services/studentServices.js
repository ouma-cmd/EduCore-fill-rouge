const user = require("../../auth/Models/user");
const Parent = require("../Models/parent");
const SchoolClass = require("../Models/SchoolClass");
const Student = require("../Models/Student");
const subject = require("../Models/subject");
const teacher = require("../Models/teacher");

async function ajouterStudentServices({
  userId,
  parentId,
  classId,
  teacherId,
  SubjectId,
  dateOfBirth,
  gender,
}) {
  const userServices = await user.findById(userId);
  if (!userServices || userServices.role !== "student") {
    return null;
  }
  const parenteServices = await Parent.findById(parentId);
  const classeServices = await SchoolClass.findById(classId);
  const teacherServices = await teacher.findById(teacherId);
  console.log("SubjectId:", SubjectId);

  const SubjectServices = await subject.findById(SubjectId);

  console.log("Subject:", SubjectServices);

  if (
    !parenteServices ||
    !classeServices ||
    !teacherServices ||
    !SubjectServices
  ) {
    return null;
  }

  //   relation
  const creatStudent = await Student.create({
    user: userServices._id,
    parent: parenteServices._id,
    classes: [classeServices._id],
    teachers: [teacherServices._id],
    subjects: [SubjectServices._id],
    dateOfBirth,
    gender,
  });
  if (!creatStudent) {
    return null;
  }
  // classe
  const mettreajourclasse = await SchoolClass.findByIdAndUpdate(
    classId,
    {
      $addToSet: {
        students: creatStudent._id,
      },
    },
    {
      new: true,
    },
  );

  // parent
  const mettreajourParent = await Parent.findByIdAndUpdate(
    parentId,
    {
      $addToSet: {
        students: creatStudent._id,
      },
    },
    {
      new: true,
    },
  );
  // teacher
  const updatedTeacher = await teacher.findByIdAndUpdate(
    teacherId,
    {
      $addToSet: {
        students: creatStudent._id,
      },
    },
    {
      new: true,
    },
  );
  // Subject/matier
  const updatedSubject = await subject.findByIdAndUpdate(
    SubjectId,
    {
      $addToSet: {
        students: creatStudent._id,
      },
    },
    {
      new: true,
    },
  );
  return creatStudent;
}

// get all students
async function affecherTousStudent() {
  const getStudent = await Student.find();
  if (!getStudent) {
    return null;
  }
  return getStudent;
}

// get student by id
async function affecherStudent(id) {
  const getStudentId = await Student.findById(id);
  if (!getStudentId) {
    return null;
  }
  return getStudentId;
}

// modiffier
async function modiffierStudent(
  idStudent,
  newStudent,
  newParentId,
  newClasse,
  newTeacher,
  newsubjects,
) {
  const modiffier = await Student.findById(idStudent);
  if (!modiffier) {
    return null;
  }
  const parentModiffier = modiffier.parent;
  const classeModiffier = modiffier.classes;
  const teacherModiffier = modiffier.teachers;
  const subjectModiffier = modiffier.subjects;

  const StudentFind = await Student.findByIdAndUpdate(idStudent, newStudent, {
    new: true,
  });
  //   parent
  const parentold = await Parent.findByIdAndUpdate(parentModiffier, {
    $pull: {
      students: idStudent,
    },
  });

  const parentNew = await Parent.findByIdAndUpdate(newParentId, {
    $addToSet: {
      students: idStudent,
    },
  });
  const studentId = await Student.findByIdAndUpdate(idStudent, {
    $set: {
      parent: newParentId,
    },
  });

  //   classe
  for (let index = 0; index < modiffier.classes.length; index++) {
    const classeold = await SchoolClass.findByIdAndUpdate(
      classeModiffier[index],
      {
        $pull: {
          students: idStudent,
        },
      },
    );
  }
  const classeNew = await SchoolClass.findByIdAndUpdate(newClasse, {
    $addToSet: {
      students: idStudent,
    },
  });
  const studentfind = await Student.findByIdAndUpdate(idStudent, {
    $set: {
      classes: [newClasse],
    },
  });
  //   teacher
  for (let index = 0; index < modiffier.teachers.length; index++) {
    const classeold = await teacher.findByIdAndUpdate(
      modiffier.teachers[index],
      {
        $pull: {
          students: idStudent,
        },
      },
    );
  }
  const teacherNew = await teacher.findByIdAndUpdate(newTeacher, {
    $addToSet: {
      students: idStudent,
    },
  });
  const studentf = await Student.findByIdAndUpdate(idStudent, {
    $set: {
      teachers: [newTeacher],
    },
  });

  //   subject
  for (let index = 0; index < modiffier.subjects.length; index++) {
    const classeold = await subject.findByIdAndUpdate(
      modiffier.subjects[index],
      {
        $pull: {
          students: idStudent,
        },
      },
    );
  }
  const subjectNew = await subject.findByIdAndUpdate(newsubjects, {
    $addToSet: {
      students: idStudent,
    },
  });
  const student = await Student.findByIdAndUpdate(idStudent, {
    $set: {
      subjects: [newsubjects],
    },
  });
const updatedStudent = await Student.findById(idStudent);
return updatedStudent;}

// supprimer student
async function deletStudent(id) {
  const getstudent = await Student.findById(id);
  if (!getstudent) {
    return null;
  }
  const parent = getstudent.parent;
  const classe = getstudent.classes;
  const teacher = getstudent.teachers;
  const subject = getstudent.subjects;
  const parentFind = await Parent.findOneAndUpdate(parent, {
    $pull: {
      students: id,
    },
  });
  for (let index = 0; index < getstudent.classes.length; index++) {
    const classeFind = await SchoolClass.findOneAndUpdate(
      getstudent.classes[index],
      {
        $pull: {
          students: id,
        },
      },
    );
  }
  for (let index = 0; index < getstudent.teachers.length; index++) {
    const teachertFind = await teacher.findOneAndUpdate(
      getstudent.teachers[index],
      {
        $pull: {
          students: id,
        },
      },
    );
  }
  for (let index = 0; index < getstudent.subjects.length; index++) {
    const subjectFind = await subject.findOneAndUpdate(
      getstudent.subjects[index],
      {
        $pull: {
          students: id,
        },
      },
    );
  }
  const removeStudent = await Student.findByIdAndDelete(id);
  if (!removeStudent) {
    return null;
  }
  return removeStudent;
}

module.exports = {
  ajouterStudentServices,
  affecherTousStudent,
  affecherStudent,
  modiffierStudent,
  deletStudent,
};
