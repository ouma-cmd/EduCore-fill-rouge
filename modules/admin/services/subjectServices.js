const parent = require("../Models/parent");
const Student = require("../Models/Student");
const subject = require("../Models/subject");
const teacher = require("../Models/teacher");

async function ajouterSubjecteServices(name, teachers, students, coefficient) {
  const ajouterSubject = await subject.find({ name: name });
  if (ajouterSubject.length > 0) {
    return null;
  }
  const creatSubject = await subject.create({
    name,
    teachers,
    students,
    coefficient,
  });
  return creatSubject;
}

async function getAllSubject() {
  const getAllSubject = await subject.find();
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

async function modiffierSubjectServices(
  idSubject,
  newSubject,
  idStudent,
  newStudent,
  idteacher,
  newTeacher,
  coefficient,
) {
  const modiffierSubject = await subject.findById(idSubject);
  if (!modiffierSubject) {
    return null;
  }
  const student = modiffierSubject.students;
  const teacherss = modiffierSubject.teachers;

  const moduffier = await subject.findByIdAndUpdate(idSubject, newSubject, {
    new: true,
  });

  //   student
  const modiffierParent = await Student.findByIdAndUpdate(idStudent, {
    $pull: {
      subjects: idSubject,
    },
  });
  const newStudentt = await Student.findByIdAndUpdate(newStudent, {
    $addToSet: {
      subjects: idSubject,
    },
  });
  const misseajourStudent = await subject.findByIdAndUpdate(idSubject, {
    $addToSet: {
      students: newStudent,
    },
  });
  const deletStudent = await subject.findByIdAndUpdate(idSubject, {
    $pull: {
      students: idStudent,
    },
  });

  //   teacher
  const oldTeacher = await teacher.findByIdAndUpdate(idteacher, {
    $pull: {
      subjects: idSubject,
    },
  });
  const newteachers = await teacher.findByIdAndUpdate(newTeacher, {
    $addToSet: {
      subjects: idSubject,
    },
  });
  const updateteacher = await subject.findByIdAndUpdate(idSubject, {
    $addToSet: {
      teachers: newteachers,
    },
  });
  const deletteacher = await subject.findByIdAndUpdate(idSubject, {
    $pull: {
      teachers: idteacher,
    },
  });
  const updetSubject = await subject.findById(idSubject);
  return updetSubject;
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
