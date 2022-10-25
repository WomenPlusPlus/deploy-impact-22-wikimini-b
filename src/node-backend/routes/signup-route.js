import express from "express";
import * as signup from "../controller/signup-controller";

const router = express.Router();

// to test: use postman, select Body -> raw type, json, format: "username":"exampleUser, "password":"examplePassword"

// teacher sign up
router.post('/teacherSignup', signup.doTeacherSignUp);
router.post('/teacherEmailConfirmed', signup.confirmTeacherAccount);

// router.post('/createClassroom', createClassroom);

export default router;