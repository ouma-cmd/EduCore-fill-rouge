const connectDB = require("./config/db");
const user = require("./modules/auth/Models/user");
const hachPassword = require("./modules/auth/utils/hachPassword");

async function createAdmin(username, email, password, role) {
  await connectDB();
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
  await user.create({ username, email, password: hash, role });
  return console.log("existe");
}

createAdmin("admin", "admin@gmail.com", "123456", "admin");
