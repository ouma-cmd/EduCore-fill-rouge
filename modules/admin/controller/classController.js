const {
  AjouterClasseServices,
  AfficherClassesServices,
  affichesClassServices,
  modiffierUnClassServices,
  SupprimerUnSclasservices,
  affectClassServices,
} = require("../services/classService");

// ajouter un classe
async function AjouterClassController(req, res) {
  const { name, level } = req.body;
  const ajouterClass = await AjouterClasseServices(name, level);
  if (!ajouterClass) {
    return res.status(400).json("class is fond ");
  }
  return res.status(200).json("class creats sucssufily");
}

// afficher les classes
async function afficherClassesController(req, res) {
  const afficherClasses = await AfficherClassesServices();
  if (afficherClasses) {
    return res.json(afficherClasses);
  }
  return res.status(400).json("not fond");
}

// afficher un class
async function afficherUnClasseController(req, res) {
  const { id } = req.params;
  const afficherUnClass = await affichesClassServices(id);
  if (afficherUnClass) {
    return res.status(200).json(afficherUnClass);
  }
  return res.status(400).json("class not fond");
}

// modifier un class
async function modiffierUnClassController(req, res) {
  const { id } = req.params;
  const bodyId = req.body;

  const modiffierUnClass = await modiffierUnClassServices(id, bodyId);
  if (modiffierUnClass) {
    return res.json(modiffierUnClass);
  }
  return res.json("not find");
}

// supprimer un class
async function supprimerUnClassController(req, res) {
  const { id } = req.params;

  const deletClass = await SupprimerUnSclasservices(id);
  if (deletClass) {
    return res.json(deletClass);
  }
  res.status(404).json("class not found");
}

module.exports = {
  AjouterClassController,
  afficherClassesController,
  afficherUnClasseController,
  modiffierUnClassController,
  supprimerUnClassController,
};
