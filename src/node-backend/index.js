const express = require("express");
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

const userRouter = require("./routes/users");
app.use("/user", userRouter);

/**Start listening */
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
