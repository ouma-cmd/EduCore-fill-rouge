const express = require("express");
const MarquerController = require("../controller/MarquerPresencesController");
const {
  NoteAjouterController,
  updateNoteController,
  moyenneNoteController,
} = require("../controller/NoteController");

const routes = express.Router();

routes.post("/MarquerPresences", MarquerController.MarquerPrésencesController);
routes.get("/historAbsence/:status", MarquerController.historAbsenceController);

// les note
routes.post("/addNote", NoteAjouterController);
routes.put("/updateNote/:id", updateNoteController);
routes.get("/moyenneNote/:id", moyenneNoteController);

module.exports = routes;
