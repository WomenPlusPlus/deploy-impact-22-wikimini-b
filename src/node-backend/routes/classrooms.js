import express from "express";
import * as classroomController from "../controller/classroom-controller.js";
export const router = express.Router();


// create classroom with passing teacher name and classname, return classId

// (request class list upload, pass file?, return list of student names (and maybe emails))

// save list of students -> a list of student names and mail addresses and a class ID
// studentNamesEmails [{name: name, email: email}, {name: name, email: email}]
router.post('/saveStudents', async function (req, res) {
    try {
        const {studentNamesEmails, classId} = req.body;
        const result = await classroomController.saveStudentsToRegister(studentNamesEmails, classId);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// send personal codes via email, pass classId

// download personal code sheet (return file?) -> to be checked, pass classId

//