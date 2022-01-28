import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ConnectDB from "./DB/db_init.js";
import Categorie from "./app/routes/Categorie.js";
import roadmap from "./app/routes/RoadMap.js";
import article from "./app/routes/Article.js";
import Message from "./app/routes/Messages.js";
import Checkpoint from "./app/routes/Checkpoint.js";
import resMsg from "./app/controllers/ErrorsPage.js";
import Project from "./app/routes/ProjectSubmission.js"
import auth from "./app/routes/Auth.js";
import admin from "./app/routes/Admin.js";

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

app.use(cookieParser());

// Routing
app.use("/categorie", Categorie);
app.use("/roadmap", roadmap);
app.use("/message",Message);
app.use("/checkpoint",Checkpoint);
app.use("/projectSubmission",Project);
app.use("/article", article);
app.use("/auth", auth);
app.use("/admin", admin);
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
