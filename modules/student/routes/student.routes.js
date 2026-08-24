const express = require("express");
const consulterController = require("../controller/afficherStudentController");
const rout = express.Router();

rout.get("/consulterNote/:id", consulterController.consulterNoteController);
rout.get(
  "/consulterAbsence/:id",
  consulterController.consulterAbsenceController,
);

module.exports = rout;
