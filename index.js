require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const route = require("./modules/auth/routes/auth.routes");
const routers = require("./modules/admin/routes/admin.routes");
const AuthMiddleware = require("./modules/auth/middlewares/AuthMiddleware");
const roleMiddleware = require("./modules/auth/middlewares/roleMiddleware");
const routes = require("./modules/teacher/routes/teacher.routes");
const roleteacherMiddlewere = require("./modules/teacher/middlewares/role.teacher");
const roleStudentMiddlewere = require("./modules/student/middlewares/roleStudentMiddlewere");
const rout = require("./modules/student/routes/student.routes");
const ParentRout = require("./modules/parent/routers/parent.route");
const roleParentMiddlewere = require("./modules/parent/middlewares/roleParentMiddlewere");

const app = express();
const port = process.env.PORT;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hi welcome ");
});
app.use("/users", route);

app.use("/admin", AuthMiddleware, roleMiddleware, routers);

app.use("/teacher", AuthMiddleware, roleteacherMiddlewere, routes);

app.use("/student", AuthMiddleware, roleStudentMiddlewere, rout);

app.use("/parent", AuthMiddleware, roleParentMiddlewere, ParentRout);

app.listen(port, () => {
  console.log("hello port", port);
});
