const express = require("express");
const consultNoteEnfantController = require("../controller/consultNoteEnfantController");
const consulterAbsencecontrollr = require("../controller/consulterAbsenceController");
const ParentRout = express.Router();

ParentRout.get("/consultNoteEnfant/:id", consultNoteEnfantController);
ParentRout.get("/consultAbsence/:id", consulterAbsencecontrollr);

module.exports = ParentRout;
