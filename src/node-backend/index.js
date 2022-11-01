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

import * as accounts from "./routes/accounts.js";
app.use("/accounts", accounts.router);

import * as classrooms from "./routes/classrooms.js";
app.use("/classrooms", classrooms.router);

// import mailer from "nodemailer";
//
// let mailTransporter = mailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'thewikifactory@gmail.com',
//     pass: 'rgegknltijasdrob'
//   }
// });
//
// let mailDetails = {
//   from: 'thewikifactory@gmail.com',
//   to: 'luciana.kolbeck@ik.me',
//   subject: 'Test mail',
//   text: 'Node.js testing mail for GeeksforGeeks'
// };
//
// mailTransporter.sendMail(mailDetails, function(err, data) {
//   if(err) {
//     console.log('Error Occurs');
//   } else {
//     console.log('Email sent successfully');
//   }
// });

/**Start listening */
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
