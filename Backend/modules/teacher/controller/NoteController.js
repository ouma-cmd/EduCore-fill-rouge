const { ajouterNote, updateNote, moyenneNote } = require("../services/NotesServicess");

async function NoteAjouterController(req, res) {
  const { classe, student, teacher, subject, score, semester, examType } =
    req.body;
  const ajouterNotee = await ajouterNote(
    classe,
    student,
    teacher,
    subject,
    score,
    semester,
    examType,
  );
  if (!ajouterNotee) {
    return res.status(400).json("not exist");
  }
  return res.status(200).json(ajouterNotee);
}

async function updateNoteController(req, res) {
  const id = req.params.id;
  const { score, semester, examType } = req.body;
  const updateNotee = await updateNote(id,score, semester, examType);
  if (!updateNotee) {
    return res.status(400).json("not fond");
  }
  return res.status(200).json(updateNotee);
}


async function moyenneNoteController(req,res){
    const id = req.params.id;
    const moyennote = await moyenneNote(id)
    if(!moyennote){
        return res.status(400).json("not fond")
    }
    return res.status(200).json(moyennote)
}


module.exports = {
  NoteAjouterController,
  updateNoteController,
  moyenneNoteController,
};
