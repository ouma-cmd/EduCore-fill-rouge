const { message } = require("../schemas/loginSchema");
const profileServices = require("../service/profileServices");

async function profileController(req, res) {
  const profile = await profileServices(req.user.id);
  if (!profile) {
    return res.status(400).json({ messagege: "user not fond" });
  } else {
    res.json(profile);
  }
}
module.exports = profileController;
