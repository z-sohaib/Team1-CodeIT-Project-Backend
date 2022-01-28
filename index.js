import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import ConnectDB from "./DB/db_init.js";
import Categorie from "./app/routes/CategorieRoutes.js";
import roadmap from "./app/routes/RoadmapRoutes.js";
import article from "./app/routes/ArticleRoutes.js";
import Message from "./app/routes/MessagesRoutes.js";
import Checkpoint from "./app/routes/CheckpointRoutes.js";
import resMsg from "./app/utils/ErrorsPage.js";
import Project from "./app/routes/ProjectSubmissionRoutes.js";
import auth from "./app/routes/AuthRoutes.js";
import admin from "./app/routes/AdminRoutes.js";
import user from "./app/routes/UserRoutes.js";

import "dotenv/config";

const app = express();

var corsOptions = {
  //origin: "http://localhost:5000",
  origin: "https://afternoon-cliffs-13788.herokuapp.com/",
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
app.use("/message", Message);
app.use("/checkpoint", Checkpoint);
app.use("/projectSubmission", Project);
app.use("/article", article);
app.use("/auth", auth);
app.use("/admin", admin);
app.use("/user", user);
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
