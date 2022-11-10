import express from "express";
import * as classroomController from "../controller/classroom-controller.js";
export const router = express.Router();

// get classroom info by: needs { classroomId }
router.post("/getClassroomById", classroomController.getClassroomById);
