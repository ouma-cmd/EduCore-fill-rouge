const parent = require("../../admin/Models/parent");
const Grade = require("../../teacher/models/Grade");

async function consultNoteEnfant(parentId) {
  const idParent = await parent.findById(parentId);
  console.log(idParent);

  if (!idParent) {
    return null;
  }
  const idStudent = idParent.students;
  if (idStudent.length === 0) {
    return null;
  }
  const gradNote = await Grade.find({ student: { $in: idStudent } });
  if (gradNote.length === 0) {
    return null;
  }
  return gradNote;
}

module.exports = consultNoteEnfant;
