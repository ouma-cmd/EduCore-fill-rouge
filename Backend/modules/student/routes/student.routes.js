const express = require("express");
const consulterController = require("../controller/afficherStudentController");
const { afficherUnClasseController } = require("../controller/AfficherClassesStudentController");
const { afficherUnClasseStudentController } = require("../controller/getSubjectStudent");
const rout = express.Router();

rout.get("/consulterNote", consulterController.consulterNoteController);
rout.get(
  "/consulterAbsence",
  consulterController.consulterAbsenceController,
);
rout.get("/consulterClasseStudent", afficherUnClasseController);

rout.get("/consulterSubjectStudent", afficherUnClasseStudentController);

module.exports = rout;
