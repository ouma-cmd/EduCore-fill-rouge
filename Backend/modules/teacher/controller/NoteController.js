const teacher = require("../../admin/Models/teacher");
const {
  ajouterNote,
  updateNote,
  moyenneNote,
  getGrade,
} = require("../services/NotesServicess");

async function NoteAjouterController(req, res) {
  const { classe, student, subject, score, semester, examType } = req.body;
  const Teachers = await teacher.findOne({ user: req.user.id });
  const ajouterNotee = await ajouterNote(
    classe,
    student,
    subject,
    Teachers,
    score,
    semester,
    examType,
  );
  if (!ajouterNotee) {
    return res.status(400).json("not exist");
  }
  return res.status(200).json(ajouterNotee);
}

async function getGradeController(req, res) {
  console.log("USER:", req.user);

  const user = req.user.id;

  console.log("TEACHER ID:", user);

  const grades = await getGrade(user);

  console.log("GRADES:", grades);

  return res.status(200).json(grades);
}

async function updateNoteController(req, res) {
  const id = req.params.id;
  const { score, semester, examType } = req.body;
  const updateNotee = await updateNote(id, score, semester, examType);
  if (!updateNotee) {
    return res.status(400).json("not fond");
  }
  return res.status(200).json(updateNotee);
}

async function moyenneNoteController(req, res) {
  const { student, classe, subject } = req.query;
  const moyennote = await moyenneNote(student, classe, subject);
  if (!moyennote) {
    return res.status(400).json("not fond");
  }
  return res.status(200).json(moyennote);
}

module.exports = {
  NoteAjouterController,
  getGradeController,
  updateNoteController,
  moyenneNoteController,
};
