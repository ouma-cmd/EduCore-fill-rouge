const user = require("../Models/user");

async function profileServices(id) {
  const currentUser = await user.findById(id);

  return currentUser;
}
module.exports = profileServices;
