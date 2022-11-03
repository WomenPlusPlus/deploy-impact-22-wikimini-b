import express from "express";
export const router = express.Router();
import * as pool from "../adapters/database-connection.js";

router.post("/getClassroomById", async function (req, res) {
  try {
    const { classroomId } = req.body;
    const sqlQuery = "SELECT * FROM classroomCodes WHERE classId=?";
    const rows = await pool.pool.query(sqlQuery, classroomId);
    res.status(200).json({ sucess: true, classroomCodes: rows });
  } catch (error) {
    res.status(400).send({ sucess: true, error: error.message });
  }
});
