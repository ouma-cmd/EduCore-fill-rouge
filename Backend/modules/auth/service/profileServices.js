const user = require("../Models/user");

async function profileServices(id) {
  const currentUser = await user.findById(id).select("-password");

  return currentUser;
}
module.exports = profileServices;
