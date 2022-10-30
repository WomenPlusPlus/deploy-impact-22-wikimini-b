import express from "express";
import * as signupController from "../controller/accounts-controller.js";
export const router = express.Router();

// complete path: /accounts/...

// teacher sign up: needs {username, password, email}
router.post('/teacherSignup', signupController.doTeacherSignUp);
router.post('/teacherEmailConfirmed', signupController.confirmTeacherAccount);

// students sign up:
router.post('/studentSignup', signupController.doStudentSignUp);

// students log in
router.post('/studentLogin', signupController.doStudentLogin);
