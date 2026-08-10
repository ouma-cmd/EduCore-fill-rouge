require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const  route  = require("./modules/auth/routes/auth.routes");

const app = express();
const port = process.env.PORT;

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hi welcome ");
});
app.use("/users", route)

app.listen(port, () => {
  console.log("hello port", port);
});
