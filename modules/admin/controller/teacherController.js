const teacherServices = require("../services/teacherServices");

async function ajouterteacherController(req, res) {
  const { userID, classeId } = req.body;

  const teacher = await teacherServices.ajouterteacherServices(
    userID,
    classeId,
  );

  if (!teacher) {
    return res.status(400).json("err");
  }
  return res.status(200).json("seccefuly");
}

async function getAllTeacherController(req, res) {
  const getAllTeacher = await teacherServices.getAllTeacherServices();
  if (!getAllTeacher) {
    return res.status(400).json("not fond ");
  }
  return res.status(200).json(getAllTeacher);
}

async function getTeacherByIdController(req, res) {
  const id = req.params.id;
  const getTeacherById = await teacherServices.getTeacherById(id);
  if (!getTeacherById) {
    return res.status(400).json("not fond");
  }
  return res.status(200).json(getTeacherById);
}

async function updateTeacherController(req, res) {
  const { id, newTeacher, studentId, classeId, subjectId } = req.body;
  const updateTeacher = await teacherServices.updateTeacher(
    id,
    newTeacher,
    studentId,
    classeId,
    subjectId,
  );
  if (!updateTeacher) {
    return res.status(400).json("not fond");
  }
  return res.status(200).json(updateTeacher);
}

async function deletTeacherController(req, res) {
  const { id, studentId, classeId, subjectId } = req.body;
  const deletTeacher = await teacherServices.deleteTeacher(
    id,
    studentId,
    classeId,
    subjectId,
  );
  if (!deletTeacher) {
    return res.status(400).json("not fond");
  }
  return res.status(200).json(deletTeacher);
}

module.exports = {
  ajouterteacherController,
  getAllTeacherController,
  getTeacherByIdController,
  updateTeacherController,
  deletTeacherController,
};
