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

async function ConsulterMoyenne(id) {
  const idParent = await parent.findById(id);
  if (!idParent) {
    return null;
  }
  const idStudent = idParent.students;
  if (!idStudent || idStudent.length === 0) {
    return null;
  }

  const groupScore = await Grade.aggregate([
    {
      $match: {
        student: { $in: idStudent },
        examType: "controller",
      },
    },
    {
      $group: {
        _id: "$student",
        totaleAvg: { $avg: "$score" },
      },
    },
  ]);
  return groupScore;
}

module.exports = {
  consultNoteEnfant,
  ConsulterMoyenne,
};
