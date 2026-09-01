const consultNoteEnfant = require("../services/consultNoteEnfant");

async function consultNoteEnfantController(req, res) {
  const parentId = req.params.id;
  const NoteEnfant = await consultNoteEnfant(parentId);
  if (!NoteEnfant) {
    return res.json("not fond");
  }
  return res.json(NoteEnfant);
}

module.exports = consultNoteEnfantController;
