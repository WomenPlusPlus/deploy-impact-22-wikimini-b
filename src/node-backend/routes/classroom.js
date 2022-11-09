import express from "express";
import * as classroomController from "../controller/classroom-controller.js";
export const router = express.Router();

// complete path: /classrooms/...


// create classroom with passing teacher name and classname, return classId
export const classroom = async (req, res) => {
    try {
        const {username, classname, classId} = req.body;
        const result = await dbAdapter.getTeacherAuthCode(username);
    } catch (error) {
        res.status(405).json({ message: error.message });
    }}
// (request class list upload, pass file?, return list of student names (and maybe emails))
async function classList() {
    
    const {studentNames, emails} = classroomController.saveStudentsToRegister(studentNames, emails);
    const result = await classroomController.request({        
            
        })
    }
// save list of students -> a list of student names and mail addresses and a class ID
router.post('/saveListOfStudents', async function (req, res) {
    try {
        const {studentNames, email, classId} = req.body;
        const result = await classroomController.saveListOfStudents(studentNames, email, classId);
        res.status(200).json(result['warningStatus'] === 0);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});
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
router.post('/saveStudents', async function (req, res) {
    try {
        const {students, emails} = req.body;
        const result = await classroomController.getSaveStudents(students, emails);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});


// send personal codes via email, pass classId and list of selected student names and emails


// download personal code sheet (return file?) -> to be checked by frontend what we need, pass classId

//