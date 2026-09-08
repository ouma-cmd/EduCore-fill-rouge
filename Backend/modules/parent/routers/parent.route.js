const express = require("express");
const consultNoteController = require("../controller/consultNoteEnfantController");
const consulterAbsencecontrollr = require("../controller/consulterAbsenceController");
const ParentRout = express.Router();

ParentRout.get(
  "/consultNoteEnfant/:id",
  consultNoteController.consultNoteEnfantController,
);
ParentRout.get(
  "/consultMoyenEnfant/:id",
  consultNoteController.consulterMoyenneEnfantController,
);
ParentRout.get("/consultAbsence/:id", consulterAbsencecontrollr);

module.exports = ParentRout;
