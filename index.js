const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const ConnectDB=require('./DB/db_init');

require("dotenv/config");

app.use(cors());

//DB connection
ConnectDB();

app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Welcome to the project");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});