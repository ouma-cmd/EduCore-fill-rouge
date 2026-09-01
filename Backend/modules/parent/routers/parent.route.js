const express = require("express");
const consultNoteEnfantController = require("../controller/consultNoteEnfantController");
const ParentRout = express.Router();

ParentRout.get("/consultNoteEnfant/:id", consultNoteEnfantController);

module.exports = ParentRout;
