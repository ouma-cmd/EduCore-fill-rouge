const jwt = require("jsonwebtoken");
const user = require("../Models/user");
const bcrypt = require("bcryptjs");

async function loginServices(email, password) {
  const emailFind = await user.findOne({
    email: email,
  });
  if (!emailFind) {
    return console.log("email not fond ");
  } else {
    const isPasswordCorrect = await bcrypt.compare(
      password,
      emailFind.password,
    );
    if (isPasswordCorrect) {
      const payload = { id: emailFind._id, role: emailFind.role };
      const secret = process.env.JWT_SECRET;
      const options = { expiresIn: "1h" };

      const token = jwt.sign(payload, secret, options);
      return token;
    } else {
      return console.log("password not correct");
    }
  }
}
module.exports = loginServices;
