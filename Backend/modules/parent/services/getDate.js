const parent = require("../../admin/Models/parent");
const Attendance = require("../../teacher/models/Attendance");

async function getDateParent(id) {
  const parentId = await parent.findOne({ user: id });

  if (!parentId) {
    return [];
  }

  const Attendances = await Attendance.find({
    student: { $in: parentId.students },
  })
    .populate({
      path: "student",
      populate: {
        path: "user",
      },
    })
    .populate("subjects")
    .populate("classe");

  return Attendances;
}

module.exports = getDateParent;
