const express = require("express");
const consultNoteController = require("../controller/consultNoteEnfantController");
const consulterAbsencecontrollr = require("../controller/consulterAbsenceController");
const {
  getChildrenParentController,
} = require("../controller/getChildrenParentController");
const getSubjectParentController = require("../controller/getSubjectParentController");
const getCLasseParentController = require("../controller/getCLasseParentController");
const getNoteParentController = require("../controller/getNoteParentController");
const getDateParentController = require("../controller/getDateController");
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

ParentRout.get("/getChildren", getChildrenParentController);
ParentRout.get("/getSubject", getSubjectParentController);
ParentRout.get("/getClasse", getCLasseParentController);
ParentRout.get("/getNote", getNoteParentController);
ParentRout.get("/getDate", getDateParentController);

module.exports = ParentRout;
