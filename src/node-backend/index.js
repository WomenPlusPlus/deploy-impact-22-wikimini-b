import express from "express";
const app = express();
const port = 3000;

/**
 * Middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/**
 * Routes
 */

app.get("/", (request, response) => {
  response
    .status(200)
    .send(
      "Home"
    );
});

import * as users from "./routes/users.js";
app.use("/user", users.router);

import * as accounts from "./routes/accounts.js";
app.use("/accounts", accounts.router);

import * as classrooms from "./routes/classrooms.js";
app.use("/classrooms", classrooms.router);

/**Start listening */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
