const MarquerPrésences = require("../services/MarquerPrésences");

async function MarquerPrésencesController(req, res) {
  const { classe, student, date, status } = req.body;
  const MarquerPrésencess = await MarquerPrésences(
    classe,
    student,
    date,
    status,
  );
  if (!MarquerPrésencess) {
    return res.status(400).json("not fond");
  }
  return res.status(200).json(MarquerPrésences);
}
module.exports = MarquerPrésencesController;
