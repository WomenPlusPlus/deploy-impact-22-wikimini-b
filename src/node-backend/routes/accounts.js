import express from "express";
import * as accountController from "../controller/accounts-controller.js";
export const router = express.Router();

// complete path: /accounts/...

// teacher sign up: needs {username, password, email}
router.post('/teacherSignup', accountController.doTeacherSignUp);
// router.post('/teacherEmailConfirmed', signupController.confirmTeacherAccount);

// students sign up: needs {username, password, code}
router.post('/studentSignup', accountController.doStudentSignUp);

// students log in: needs {username, password}
router.post('/studentLogin', accountController.doStudentLogin);
