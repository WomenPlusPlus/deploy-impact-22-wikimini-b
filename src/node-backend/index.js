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
  response.status(200).send({success: true, message: "home"});
});

import * as users from "./routes/users.js";
app.use("/user", users.router);

import * as accounts from "./routes/accounts.js";
app.use("/accounts", accounts.router);

/**Start listening */
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
