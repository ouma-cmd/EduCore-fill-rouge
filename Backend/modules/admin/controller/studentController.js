const studentServices = require("../services/studentServices");

async function ajouterStudentController(req, res) {
  const { dateOfBirth, gender } = req.body;
  const { userId, parentId, classId, teacherId, SubjectId } = req.body;
  const ajouterStudent = await studentServices.ajouterStudentServices({
    userId,
    parentId,
    classId,
    teacherId,
    SubjectId,
    dateOfBirth,
    gender,
  });
    
  if (!ajouterStudent) {
    return res.status(400).json("error");
  }
  return res.status(200).json("seccess");
}

// GET all student
async function getallStudent(req, res) {
  const getstudent = await studentServices.affecherTousStudent();
  if (!getstudent) {
    return res.json(400);
  }
  return res.json(getstudent);
}
// get by id
async function getStudent(req, res) {
  const id = req.params.id;
  const student = await studentServices.affecherStudent(id);
  if (!student) {
    return res.json(400);
  }
  return res.json(student);
}
// modiffier student by id 
async function modiffierController(req, res) {
  const {
    idStudent,
    newStudent,
    newParentId,
    newClasse,
    newTeacher,
    newsubjects,
  } = req.body;

  const modiffier = await studentServices.modiffierStudent(
    idStudent,
    newStudent,
    newParentId,
    newClasse,
    newTeacher,
    newsubjects,
  );
  if (modiffier) {
    return res.json(modiffier);
  }
  return res.json(400);
}

// delet
async function deletStudentController(req, res) {
  const id = req.params.id;
  const delet = studentServices.deletStudent(id);
  if (!delet) {
    return res.json(400);
  }
  return res.json(delet);
}

module.exports = {
  ajouterStudentController,
  getallStudent,
  getStudent,
  modiffierController,
  deletStudentController,
};
