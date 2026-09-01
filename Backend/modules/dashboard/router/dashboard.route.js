const express = require("express");
const dashboardController = require("../controller/dashboardAdminController");
const dashboardStudentController = require("../controller/dashboardStudentController");
const roleMiddleware = require("../../auth/middlewares/roleMiddleware");
const roleStudentMiddlewere = require("../../student/middlewares/roleStudentMiddlewere");
const roleParentMiddlewere = require("../../parent/middlewares/roleParentMiddlewere");
const dashboardParentController = require("../controller/dashboardParentController");
const roleteacherMiddlewere = require("../../teacher/middlewares/role.teacher");
const dashboardTeacherController = require("../controller/dashboardTeacherController");
const dashrout = express.Router();

dashrout.get("/dashAdmin", roleMiddleware, dashboardController);
dashrout.get(
  "/dashStudent/:id",
  roleStudentMiddlewere,
  dashboardStudentController,
);
dashrout.get(
  "/dashParent/:id",
  roleParentMiddlewere,
  dashboardParentController,
);
dashrout.get(
  "/dashTeacher/:id",
  roleteacherMiddlewere,
  dashboardTeacherController,
);

module.exports = dashrout;
