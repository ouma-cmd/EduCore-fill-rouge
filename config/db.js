require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose 
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("connect db");
    })
    .catch(() => {
      console.log("no connect");
    });
};
module.exports = connectDB