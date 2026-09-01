const parentServices = require("../services/parentServices");

async function ajouterparentController(req, res) {
  const { userId, phone } = req.body;

  const createParent = await parentServices.ajouterparentServices({
    userId,
    phone,
  });
  if (!createParent) {
    return res.status(400).json("not fond");
  }
  return res.status(200).json("seccess");
}

async function afficherTousParentController(req, res) {
  const getparent = await parentServices.afficherTousParent();
  if (!getparent) {
    return res.json("400");
  }
  return res.json(getparent);
}

async function afficherUnParentController(req, res) {
  const id = req.params.id;
  const getParentById = await parentServices.afficherUnParent(id);
  if (!getParentById) {
    return res.json("not fond");
  }
  return res.json(getParentById);
}

async function updateParentController(req, res) {
  const id = req.params.id;
  const { idStudent, newParent, phone } = req.body;
  const updateParent = await parentServices.updateParentServices(
    id,
    idStudent,
    newParent,
    phone,
  );
  if (!updateParent) {
    return res.status(400).json("not fond");
  }
  return res.status(200).json(updateParent);
}

async function deletParentController(req, res) {
  const id = req.params.id;
  const deletParent = await parentServices.deleParentServices(id);
  if (!deletParent) {
    return res.status(400).json("not fond");
  }
  return res.status(200).json(deletParent);
}

module.exports = {
  ajouterparentController,
  afficherTousParentController,
  afficherUnParentController,
  updateParentController,
  deletParentController,
};
