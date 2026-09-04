const consulterAbsence = require("../services/consulterAbsence");

async function consulterAbsencecontrollr(req, res) {
  const id = req.params.id;
  const ConsulterAbsence = await consulterAbsence(id);
  if (!consulterAbsence) {
    return res.status(400).json("not fond");
  }
  return res.status(200).json(consulterAbsence);
}
module.exports = consulterAbsencecontrollr;
