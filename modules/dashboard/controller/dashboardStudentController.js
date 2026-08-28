const dashStudent = require("../services/dashboardStudent");

async function dashboardStudentController(req, res) {
  const id = req.params.id;
  const student = await dashStudent(id);
  if (!student) {
    return res.json("not fond");
  }
  return res.json(student);
}

module.exports = dashboardStudentController;
