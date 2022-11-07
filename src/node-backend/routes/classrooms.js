import express from "express";
import * as classroomController from "../controller/classroom-controller.js";
export const router = express.Router();

// complete path: /classrooms/...


// create classroom with passing teacher name and classname, return classId

// (request class list upload, pass file?, return list of student names (and maybe emails))

// save list of students -> a list of student names and mail addresses and a class ID
// studentNamesEmails: list of JoiningStudent() [{fullName: name, email: email}, {fullName: name, email: email}] (email is optional)
router.post('/saveStudents', async function (req, res) {
    try {
        const {studentNamesEmails, classId} = req.body;
        const result = await classroomController.saveStudentsToRegister(studentNamesEmails, classId);
        res.status(200).json(result['warningStatus'] === 0);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// return list of students and emails (list of JoiningStudent() objects) to frontend, should that include the signup codes?

// send personal codes via email, pass classId and list of selected student names and emails

// download personal code sheet (return file?) -> to be checked by frontend what we need, pass classId

//