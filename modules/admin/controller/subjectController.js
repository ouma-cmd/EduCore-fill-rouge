const ajouterSubjecteServices = require("../services/subjectServices");

async function ajouterSubjectController(req, res) {
  const { name, teachers, students, coefficient } = req.body;
  const ajotesSubject = await ajouterSubjecteServices(
    name,
    teachers,
    students,
    coefficient,
  );
  if (!ajotesSubject) {
    return res.json("not creat subject");
  }
  return res.json(ajotesSubject);
}

async function getAllSubjectController(req, res) {
  const getSubject = await ajouterSubjecteServices.getAllSubject();
  if (!getSubject) {
    return res.status(400).json("not fond");
  }
  return res.status(200).json(getSubject);
}

async function getSubjectByIdController(req, res) {
  const id = req.params.id;
  const getSubjectById = await ajouterSubjecteServices.getSubjectById(id);
  if (!getSubjectById) {
    return res.status(400).json("not fond");
  }
  return res.status(200).json(getSubjectById);
}

async function updeteSubjectController(req, res) {
  const {
    idSubject,
    newSubject,
    idStudent,
    newStudent,
    idteacher,
    newTeacher,
    coefficient,
  } = req.body;
  const ubdetSubject = await ajouterSubjecteServices.modiffierSubjectServices(
    idSubject,
    newSubject,
    idStudent,
    newStudent,
    idteacher,
    newTeacher,
    coefficient,
  );
  if (!ubdetSubject) {
    return res.json(400);
  }
  return res.json(ubdetSubject);
}
async function deletSubjectController(req, res) {
  const id = req.params.id;
  const deletSubject = await ajouterSubjecteServices.deletSubjectServices(id);
  if (!deletSubject) {
    return res.json(deletSubject);
  }
  return res.json("delet");
}
module.exports = {
  ajouterSubjectController,
  getAllSubjectController,
  getSubjectByIdController,
  updeteSubjectController,
  deletSubjectController,
};
