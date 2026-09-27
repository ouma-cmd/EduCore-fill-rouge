const parent = require("../../admin/Models/parent");
const Grade = require("../../teacher/models/Grade");

async function getNoteParent(id) {
  const parentId = await parent.findOne({ user: id });

  if (!parentId) {
    return [];
  }

  const grades = await Grade.find({
    student: { $in: parentId.students },
  })
    .populate({
      path: "student",
      populate: {
        path: "user",
      },
    })
    .populate("subject")
    .populate("classe");

  return grades;
}

module.exports = getNoteParent;
