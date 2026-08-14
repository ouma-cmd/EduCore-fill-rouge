require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const  route  = require("./modules/auth/routes/auth.routes");
const routers = require("./modules/admin/routes/admin.routes");
const AuthMiddleware = require("./modules/auth/middlewares/AuthMiddleware");
const roleMiddleware = require("./modules/auth/middlewares/roleMiddleware");

const app = express();
const port = process.env.PORT;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hi welcome ");
});
app.use("/users", route)

app.use("/admin" ,AuthMiddleware , roleMiddleware, routers)

app.listen(port, () => {
  console.log("hello port", port);
});
