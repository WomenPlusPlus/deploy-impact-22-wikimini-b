import express from "express";
import cors from "cors";
import * as accounts from "./routes/accounts.js";
import * as users from "./routes/users.js";
import * as classrooms from "./routes/classrooms.js";
import * as homework from "./routes/homework.js";
import * as articles from "./routes/articles.js";

const app = express();
const port = 3000;

/**
 * Middleware
 /**
 * Routes
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


app.get("/", (request, response) => {
  response.status(200).send({success: true, message: "home"});
});

app.use("/user", users.router);
app.use("/accounts", accounts.router);
app.use("/classrooms", classrooms.router);
app.use("/homework", homework.router);
app.use("/articles", articles.router);

/**Start listening */
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});