const parent = require("../../admin/Models/parent");

async function getSubjectParent(id) {
  const parentId = await parent.findOne({ user: id });
  if (!parentId) {
    return [];
  }
  await parentId.populate({
    path: "students",
    populate: {
      path: "subjects",
    },
  });
  return parentId.students;
}
module.exports = getSubjectParent;
