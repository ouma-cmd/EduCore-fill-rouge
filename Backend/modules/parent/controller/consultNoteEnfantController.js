const consultNote = require("../services/consultNoteEnfant");

async function consultNoteEnfantController(req, res) {
  const parentId = req.params.id;
  const NoteEnfant = await consultNote.consultNoteEnfant(parentId);
  if (!NoteEnfant) {
    return res.json("not fond");
  }
  return res.json(NoteEnfant);
}
async function consulterMoyenneEnfantController(req, res) {
  const id = req.params.id;
  const moyenneNote = await consultNote.ConsulterMoyenne(id);
  if (!moyenneNote) {
    return res.json("not fond");
  }
  return res.json(moyenneNote);
}

module.exports = {
  consultNoteEnfantController,
  consulterMoyenneEnfantController,
};
