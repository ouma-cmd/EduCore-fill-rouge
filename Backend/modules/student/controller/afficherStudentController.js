const consulterNote = require("../services/afficherStudent");

async function consulterNoteController(req, res) {
  const idStudent = req.params.id;
  const consultNote = await consulterNote(idStudent);
  if (!consultNote) {
    return res.status(400).json("not fond");
  }
  return res.status(200).json(consultNote);
}

async function consulterAbsenceController(req, res) {
  const studentId = req.params.id;
  const findAbsence = await consulterNote.consulterAbsence(studentId);
  if (!findAbsence) {
    return res.json("not fond");
  }
  return res.json(findAbsence);
}

module.exports = {
  consulterNoteController,
  consulterAbsenceController,
};
