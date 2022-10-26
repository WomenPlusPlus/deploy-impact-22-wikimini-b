import express from "express";
import * as signupController from "../controller/signup-controller.js";
export const router = express.Router();

// to test: use postman, select Body -> raw type, json, format: "username":"exampleUser, "password":"examplePassword"

// teacher sign up
router.post('/teacherSignup', signupController.doTeacherSignUp);
router.post('/teacherEmailConfirmed', signupController.confirmTeacherAccount);
