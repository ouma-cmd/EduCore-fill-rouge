const Note = require("../services/afficherStudent");

async function consulterNoteController(req, res) {
  const id = req.user.id;
  const consultNotes = await Note.consulterNote(id);
  if (!consultNotes) {
    return res.status(400).json("not fond");
  }
  return res.status(200).json(consultNotes);
}

async function consulterAbsenceController(req, res) {
  const userId = req.user.id;
  const findAbsence = await Note.consulterAbsence(userId);
  if (!findAbsence) {
    return res.status(404).json("not found");
  }
  return res.status(200).json(findAbsence);
}

module.exports = {
  consulterNoteController,
  consulterAbsenceController,
};
