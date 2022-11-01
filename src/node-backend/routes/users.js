import express from "express";
export const router = express.Router();
import * as pool from "../adapters/database-adapter.js";
// const bcrypt = require("bcrypt");

/*
to test on postman:
url: localhost:3000/user/getUser
body: {"id": <user id>} (setup on HeidiSQL)
*/
router.post("/getUser", async function (req, res) {
  try {
    const sqlQuery = "SELECT * FROM students";
    const rows = await pool.pool.query(sqlQuery);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// router.post("/register", async function (req, res) {
//   try {
//     const { email, password } = req.body;

//     const encryptedPassword = await bcrypt.hash(password, 10);

//     const sqlQuery = "INSERT INTO user (email, password) VALUES (?,?)";
//     const result = await pool.query(sqlQuery, [email, encryptedPassword]);

//     res.status(200).json({ userId: result.insertId });
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });

// router.post("/login", async function (req, res) {
//   try {
//     const { id, password } = req.body;

//     const sqlGetUser = "SELECT password FROM user WHERE id=?";
//     const rows = await pool.query(sqlGetUser, id);
//     if (rows) {
//       const isValid = await bcrypt.compare(password, rows[0].password);
//       res.status(200).json({ valid_password: isValid });
//     }
//     res.status(200).send(`User with id ${id} was not found`);
//   } catch (error) {
//     res.status(400).send(error.message);
//   }
// });
