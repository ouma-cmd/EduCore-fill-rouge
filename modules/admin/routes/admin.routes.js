const express = require("express");
const userController = require("../controller/userController");
const {
  AjouterClassController,
  afficherClassesController,
  afficherUnClasseController,
  modiffierUnClassController,
  supprimerUnClassController,
  AffecterelèvesController,
} = require("../controller/classController");
const studentController = require("../controller/studentController");
const parentController = require("../controller/parentController");
const teacherController = require("../controller/teacherController");
const subjectContoller = require("../controller/subjectController");

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

// student
routers.post("/ajouterStudent", studentController.ajouterStudentController);
routers.get("/getStudent/:id", studentController.getStudent);
routers.get("/getAllStudent", studentController.getallStudent);
routers.delete("/deleteStudent/:id", studentController.deletStudentController);
routers.put("/modiffierStudent", studentController.modiffierController);

// parent
routers.post("/ajouterParent", parentController.ajouterparentController);
routers.get("/getParent", parentController.afficherTousParentController);
routers.get("/getByIdParent/:id", parentController.afficherUnParentController);
routers.put("/modiffierParent/:id", parentController.updateParentController);
routers.delete("/deleteParent/:id", parentController.deletParentController);

// teacher
routers.post("/ajouterteacher", teacherController.ajouterteacherController);
routers.get("/getAllTeacher", teacherController.getAllTeacherController);
routers.get("/getTeacherById/:id", teacherController.getTeacherByIdController);
routers.put("/updateTeacher", teacherController.updateTeacherController);
routers.delete("/deletTeacher", teacherController.deletTeacherController);

// subject/matier
routers.post("/ajouterSubject", subjectContoller.ajouterSubjectController);
routers.get("/getAllSubject", subjectContoller.getAllSubjectController);
routers.get("/getSubjectById", subjectContoller.getSubjectByIdController);
routers.put("/modiffierSubject", subjectContoller.updeteSubjectController);
routers.delete("/deleteSubject/:id", subjectContoller.deletSubjectController);

// annonce


module.exports = routers;
