import * as users from "./routes/users.js";
import * as accounts from "./routes/accounts.js";

import cors from "cors";
import express from "express";
const app = express();
const port = 3000;

/**
 * Middleware
 */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
/**
 * Routes
 */

app.get("/", (request, response) => {
  response.status(200).send({success: true, message: "home"});
});

app.use("/user", users.router);
app.use("/accounts", accounts.router);

/**Start listening */
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
