const express = require("express");
const dashboardController = require("../controller/dashboardController");
const dashrout = express.Router();

dashrout.get("/dashAdmin", dashboardController);

module.exports = dashrout;
