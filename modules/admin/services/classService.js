const SchoolClass = require("../Models/SchoolClass");
const Student = require("../Models/Student");

// ajouter class
async function AjouterClasseServices(name, level) {
  const nameClass = await SchoolClass.findOne({ name });
  if (nameClass) {
    return null;
  }
  const creatClass = await SchoolClass.create({ name, level });
  return creatClass;
}

// afficher classes
async function AfficherClassesServices() {
  const afficherClasses = await SchoolClass.find();
  if (!afficherClasses) {
    return [];
  }
  return afficherClasses;
}

// afficher un class
async function affichesClassServices(id) {
  const afficherUnClass = await SchoolClass.findById(id);
  if (!afficherUnClass) {
    return "class is not find";
  }
  return afficherUnClass;
}

// modiffier un class

async function modiffierUnClassServices(id, bodyId) {
  const modifier = await SchoolClass.findByIdAndUpdate(id, bodyId, {
    new: true,
  });
  if (!modifier) {
    return "not find class ";
  }
  return modifier;
}

// supprimer un class
async function SupprimerUnSclasservices(id) {
  const delet = await SchoolClass.findByIdAndDelete(id);

  if (delet) {
    return delet;
  }
  return null;
}


module.exports = {
  AjouterClasseServices,
  AfficherClassesServices,
  affichesClassServices,
  modiffierUnClassServices,
  SupprimerUnSclasservices,
};
