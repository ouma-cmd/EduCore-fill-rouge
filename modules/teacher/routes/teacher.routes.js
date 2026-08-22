const express = require("express");
const MarquerPrésencesController = require("../controller/MarquerPresencesController");

const routes = express.Router();

routes.post("/MarquerPresences", MarquerPrésencesController);

module.exports = routes