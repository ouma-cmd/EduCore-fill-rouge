const SchoolClass = require("../Models/SchoolClass");
const Student = require("../../student/models/Student");

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

// Affecter les élèves
async function AffecterElèvesServices(idStudent, idClasse) {
  const AffecterUser = await Student.findById(idStudent);
  const affecterClass = await SchoolClass.findByIdAndUpdate(
    idClasse,
    {
      $addToSet: {
        students: idStudent,
      },
    },
    {
      new: true,
    },
  );
  if (affecterClass) {
    return affecterClass;
  }
  return null;
}

// Affecter les classe
async function affectClassServices(idstudent, idClass) {
  const affectClass = await SchoolClass.findById(idClass);
  console.log("STUDENT FOUND:", await Student.findById(idstudent));
console.log("CLASS FOUND:", await SchoolClass.findById(idClass));
  const affecteStudent = await Student.findByIdAndUpdate(
    idstudent,
    {
      $addToSet: {
        classes: idClass,
      },
    },
    { new: true },
  );
  if(affecteStudent){
    return affecteStudent;
  }
  return null
}

module.exports = {
  AjouterClasseServices,
  AfficherClassesServices,
  affichesClassServices,
  modiffierUnClassServices,
  SupprimerUnSclasservices,
  AffecterElèvesServices,
  affectClassServices,
};
