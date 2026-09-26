const express = require("express");
const MarquerController = require("../controller/MarquerPresencesController");
const {
  NoteAjouterController,
  updateNoteController,
  moyenneNoteController,
  getGradeController,
} = require("../controller/NoteController");
const { afficherUnClasseController } = require("../controller/getClasseTeacherController");
const { afficherStudentsController } = require("../controller/getStudentTEacherController");
const { afficherSubejctController } = require("../controller/getSubjectTeacheController");

const routes = express.Router();

routes.post("/MarquerPresences", MarquerController.MarquerPrésencesController);
routes.get("/historAbsence", MarquerController.historAbsenceController);

// les note
routes.post("/addNote", NoteAjouterController);
routes.get("/getGrad", getGradeController);
routes.put("/updateNote/:id", updateNoteController);
routes.get("/moyenneNote", moyenneNoteController);

// classe
routes.get("/getClasse", afficherUnClasseController);

// student
routes.get("/students", afficherStudentsController);

// subject
routes.get("/subject", afficherSubejctController);




module.exports = routes;
