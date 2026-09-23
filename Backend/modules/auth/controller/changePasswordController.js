const changePasswordService = require("../service/changePasswordService");

async function changePasswordController(req, res) {
  const id = req.user.id;
  const { oldPassword, newPassword } = req.body;
  const changePassword = await changePasswordService(
    id,
    oldPassword,
    newPassword,
  );
  if (changePassword === "password not right") {
    return res.status(400).json({
      message: "Current password is incorrect",
    });
  }

  return res.status(200).json({
    message: "Password changed successfully",
  });
}
module.exports = changePasswordController;
