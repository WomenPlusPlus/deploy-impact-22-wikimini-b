import express from "express";
import * as accountsController from "../controller/accounts-controller.js";
export const router = express.Router();

// complete path: /accounts/...

// teacher sign up: needs {username, password, email}
router.post('/teacherSignup', accountsController.doTeacherSignUp);

// teacher email confirmation: needs {username, authCode}
router.post('/confirmEmail', accountsController.confirmTeacherAccount);

// students sign up: needs {username, password, code}
router.post('/studentSignup', accountsController.doStudentSignUp);

// students log in: needs {username, password}
router.post('/studentLogin', accountsController.doStudentLogin);
