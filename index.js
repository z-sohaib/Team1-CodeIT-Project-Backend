import express from "express";
import cors from "cors";
import ConnectDB from "./DB/db_init.js"

import "dotenv/config";

const app = express();


var corsOptions = {
  origin: "http://localhost:5000"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
  res.send("Welcome to the project");
});

//DB connection
ConnectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});