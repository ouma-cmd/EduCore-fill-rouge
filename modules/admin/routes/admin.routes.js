const express = require("express");
const userController = require("../controller/userController");
const {
  AjouterClassController,
  afficherClassesController,
  afficherUnClasseController,
  modiffierUnClassController,
  supprimerUnClassController,
  AffecterelèvesController,
  affecterClasseController,
} = require("../controller/classController");

const routers = express.Router();

// user
routers.post("/ajouter", userController.AjouterUserController);
routers.get("/afficher", userController.AfficherUserController);
routers.get("/afficher/:role", userController.AfficherUserController);
routers.get("/afficher/id/:id", userController.afficherUserByIdController);
routers.put("/modifier/:id", userController.modifierUserByIdController);
routers.delete("/delet/:id", userController.supprimeruserByIdController);

// classe
routers.post("/ajouterClasse", AjouterClassController);
routers.get("/afficherClasses", afficherClassesController);
routers.get("/afficherUnClasse/:id", afficherUnClasseController);
routers.put("/modiffier/:id", modiffierUnClassController);
routers.delete("/deletClass/:id", supprimerUnClassController);

// relastion class et eleve 
routers.put("/student/", AffecterelèvesController);
routers.put("/classe/", affecterClasseController);


module.exports = routers;
