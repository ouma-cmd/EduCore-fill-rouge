const changePasswordService = require("../service/changePasswordService");

async function changePasswordController(req, res) {
  const id = req.user.id;
  const { oldPassword, newPassword } = req.body;
  const changePassword = await changePasswordService(
    id,
    oldPassword,
    newPassword,
  );
  return res.json(changePassword);
}
module.exports = changePasswordController;
