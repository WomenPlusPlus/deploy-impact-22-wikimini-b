import express from "express";
import * as signupController from "../controller/accounts-controller.js";
export const router = express.Router();

// complete path: /accounts/...

// teacher sign up: needs {username, password, email}
router.post('/teacherSignup', signupController.doTeacherSignUp);

// teacher email confirmation: needs {username, authCode}
router.post('/emailConfirmed', signupController.confirmTeacherAccount);

// students sign up: needs {username, password, code}
router.post('/studentSignup', signupController.doStudentSignUp);

// students log in: needs {username, password}
router.post('/studentLogin', signupController.doStudentLogin);
