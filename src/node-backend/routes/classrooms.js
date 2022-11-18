import express from "express";
import * as classroomController from "../controller/classroom-controller.js";
export const router = express.Router();

// complete path: /classrooms/...

// get classroom info by: needs { classroomId }
router.post("/getClassroomById", classroomController.getClassroomById);

// create classroom with passing teacher name and classname, return classId
// needs {username, classname}, returns classId
router.post('/createClassroom', async function (req, res) {
    try {
        const {username, classname} = req.body;
        const result = await classroomController.createClassroom(username, classname);
        res.status(200).json(result);
    } catch (error) {
        res.status(405).json({ message: error.message });
    }
});

// save list of students -> a list of student names and mail addresses and a class ID
// studentNamesEmails: list of JoiningStudent() [{fullName: name, email: email}, {fullName: name, email: email}] (email is optional)
router.post('/saveJoiningStudents', async function (req, res) {
    try {
        const {studentNamesEmails, classId} = req.body;
        const result = await classroomController.saveJoiningStudents(studentNamesEmails, classId);
        res.status(200).json(result['warningStatus'] === 0);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// return list of students and emails (list of JoiningStudent() objects) to frontend, should that include the signup codes?
// needs {classId}, returns list of JoiningStudent() objects
router.post('/getJoiningStudents', async function (req, res) {
    try {
        const {classId} = req.body;
        const result = await classroomController.getJoiningStudents(classId);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

