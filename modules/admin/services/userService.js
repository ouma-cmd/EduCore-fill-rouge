const user = require("../../auth/Models/user");
const hachPassword = require("../../auth/utils/hachPassword");

//ajouter user
async function AjouterUserServices(username, email, password, role) {
  const findEmail = await user.findOne({ email: email });

  if (findEmail) {
    return "email fond";
  }
  const hach = await hachPassword(password);
  const newUser = await user.create({ username, email, password: hach, role });
  return "user create succefuly";
}

// afficher users
async function AfficherUserServices(role) {
  if (role) {
    const getUser = await user.find({ role });
    return getUser;
  }

  const getUser = await user.find();
  if (getUser.length) {
    return getUser;
  } else {
    return "not fond";
  }
}

// get user by id
async function afficherUserByIdServices(id) {
  const getUserById = await user.findById(id);
  if (!getUserById) {
    return "not fond";
  }
  return getUserById;
}

// modiffier user
async function modiffierUserByIdServices(id, userBody) {
  const ubdeteUser = await user.findByIdAndUpdate(id, userBody, { new: true });
  if (!ubdeteUser) {
    return "not fond ";
  }
  return ubdeteUser;
}

async function supprimerUserByIdServices(id) {
  const deletUserById = await user.findByIdAndDelete(id);
  if (!deletUserById) {
    return "not fond";
  }
  return deletUserById;
}

module.exports = {
  AjouterUserServices,
  AfficherUserServices,
  afficherUserByIdServices,
  modiffierUserByIdServices,
  supprimerUserByIdServices,
};
