const dashTeacher = require("../services/dashboardTeacher");

async function dashboardTeacherController(req, res) {
  const id = req.params.id;
  const teacher = await dashTeacher(id);
  if (!teacher) {
    return res.json("not fond");
  }
  return res.json(teacher);
}
module.exports = dashboardTeacherController;
