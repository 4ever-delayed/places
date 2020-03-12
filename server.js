require("dotenv").config();
const express = require("express");

const server = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const router = require("./routes/router");

const authorization = require("./middleware/authorization");
const error = require("./middleware/error");


server.use(authorization);
server.use(error);
server.use(router);
server.use(bodyParser.json());

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to db");
});
server.listen(3000, () => console.log("server started"));
