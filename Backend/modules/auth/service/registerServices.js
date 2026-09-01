const user = require("../Models/user");
const hachPassword = require("../utils/hachPassword");

async function registerService(email, password, username , role) {
  const useremail = await user.findOne({
    email: email,
  });
  const usernam = await user.findOne({
    username: username,
  });
  if (useremail) {
    return console.log("email fond");
  }
  if (usernam) {
    return console.log("username fond");
  }
  const hash = await hachPassword(password);
  await user.create({ username, email, password: hash , role });
  return console.log("existe");
}
module.exports = registerService;
