const userServices = require("../services/userService");

//  add user
async function AjouterUserController(req, res) {
  const { username, email, password, role } = req.body;

  const ajouteUser = await userServices.AjouterUserServices(
    username,
    email,
    password,
    role,
  );

  if (ajouteUser === "user create succefuly") {
    return res.status(201).json({ message: ajouteUser });
  }
  res.status(400).json("email find ");
}
//  get user
async function AfficherUserController(req, res) {
  const { role } = req.params;
  const afficherUser = await userServices.AfficherUserServices(role);
  if (afficherUser) {
    return res.json(afficherUser);
  }
}

// get user by id
async function afficherUserByIdController(req, res) {
  const { id } = req.params;
  console.log("ID:", id);
  const getUserById = await userServices.afficherUserByIdServices(id);
  if (!getUserById) {
    return res.status(400).json("not fond");
  }
  return res.json(getUserById);
}

async function modifierUserByIdController(req, res) {
  const { id } = req.params;
  const userBody = req.body;

  const ubdetController = await userServices.modiffierUserByIdServices(
    id,
    userBody,
  );
  if (!ubdetController) {
    return res.status(400).json("not fond ");
  }
  return res.json(ubdetController);
}

async function supprimeruserByIdController(req,res){
const {id} = req.params;
const deletUser = await userServices.supprimerUserByIdServices(id)
if(!deletUser){
    return res.status(400).json("not fond")
}
return res.json(deletUser) 
}

module.exports = {
  AjouterUserController,
  AfficherUserController,
  afficherUserByIdController,
  modifierUserByIdController,
  supprimeruserByIdController
};
