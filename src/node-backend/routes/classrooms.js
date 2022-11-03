import express from "express";
import * as signupController from "../controller/classroom-controller.js";
export const router = express.Router();

//
// router.post('/teacherSignup', signupController.doTeacherSignUp);
// router.post('/teacherEmailConfirmed', signupController.confirmTeacherAccount);