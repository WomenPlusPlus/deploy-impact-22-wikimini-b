import express from "express";
import * as hwController from "../controller/homework-controller.js";
import {HwTask} from "../models/domain-objects.js";
export const router = express.Router();

// complete path: /homework/...

// get current homework for a student: needs student username as {username}
// returns StudentHwList object
router.post('/hwForStudent', async function (req, res) {
    try {
        const {username} = req.body;
        const result = await hwController.getHwForStudent(username);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// get homework task by hw task id, needs {hwTaskId}, returns HwTask
router.post('/getHwTask', async function (req, res) {
    try {
        const {hwTaskId} = req.body;
        const result = await hwController.getHwTask(hwTaskId);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// add new homework task: needs {classId, title, description, gradingCategories, startDate, dueDate}
// gradingCategories: [list of category IDs]
// returns taskIDs (list of taskIds)
router.post('/addNewHwForClass', async function (req, res) {
    try {
        const {classId, title, description, gradingCategories, startDate, dueDate} = req.body;
        const newHw = new HwTask(title, description, "tbd", "tbd", gradingCategories, startDate, dueDate);
        const result = await hwController.addNewHwTaskForClass(classId, newHw);
        res.status(200).json(result);
    } catch (error) {
        res.status(412).json({ message: error.message });
    }
});

// add grading category: needs topic the category was added to, new category GradingCategory()
router.post('/addGradingCategory', async function (req, res) {
    try {
        const {topicId, gradingCategoryName} = req.body;
        const result = await hwController.addGradingCategory(topicId, gradingCategoryName);
        res.status(200).json(result);
    } catch (error) {
        res.status(413).json({ message: error.message });
    }
});

// get all topics and grading categories, returns list of GradingCategory()
router.post('/getGradingCategories', async function (req, res) {
    try {
        const result = await hwController.getGradingCategories();
        res.status(200).json(result);
    } catch (error) {
        res.status(413).json({ message: error.message });
    }
});

// check for achievements: needs {username} of the student, returns list of Achievement() objects
router.post('/getAchievements', async function (req, res) {
    try {
        const {username} = req.body;
        const result = await hwController.checkAchievements(username);
        res.status(200).json(result);
    } catch (error) {
        res.status(413).json({ message: error.message });
    }
});

