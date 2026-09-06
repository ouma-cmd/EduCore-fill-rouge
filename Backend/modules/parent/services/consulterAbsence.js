const parent = require("../../admin/Models/parent");

async function consulterAbsence(id) {
  const idParent = await parent.findById(id);
  if (!idParent) {
    return null;
  }
  const idStudent = idParent.students;
  if (!idStudent) {
    return null;
  }
  return idStudent;
}
module.exports = consulterAbsence;
