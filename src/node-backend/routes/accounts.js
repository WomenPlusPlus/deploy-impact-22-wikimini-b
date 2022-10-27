import express from "express";
import * as signupController from "../controller/accounts-controller.js";
export const router = express.Router();

// to test: use postman, select Body -> raw type, json, format: "username":"exampleUser, "password":"examplePassword"

// teacher sign up
router.post('/teacherSignup', signupController.doTeacherSignUp);
router.post('/teacherEmailConfirmed', signupController.confirmTeacherAccount);

// students sign up
router.post('/studentSignup', signupController.doStudentSignUp);

// students log in
router.post('/studentLogin', signupController.doStudentLogin);
