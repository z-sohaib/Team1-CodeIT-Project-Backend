import express from "express";
import cors from "cors";
import ConnectDB from "./DB/db_init.js";
import Categorie from "./app/routes/Categorie.js";
import roadmap from "./app/routes/RoadMap.js";
import article from "./app/routes/Article.js";
import Message from "./app/routes/Messages.js"
import resMsg from "./app/controllers/ErrorsPage.js";

import "dotenv/config";

const app = express();

var corsOptions = {
  origin: "http://localhost:5000",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Routing
app.use("/categorie", Categorie);
app.use("/roadmap", roadmap);
app.use("/article", article);
app.use("/message",Message);

app.get("/", (req, res) => {
  res.send("Welcome to the project");
});
app.all("*", (req, res) => {
  res.status(400).json(resMsg.notValide);
});

//DB connection
ConnectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});
