import express from "express";
import cors from "cors";

import * as accounts from "./routes/accounts.js";
import * as users from "./routes/users.js";
import * as classrooms from "./routes/classrooms.js";

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

/**Start listening */
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
