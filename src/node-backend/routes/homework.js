import express from "express";
import * as hwController from "../controller/homework-controller.js";
import {HwTask} from "../models/domain-objects.js";
export const router = express.Router();

// complete path: /homework/...

// get current homework for a teacher: needs classId as {classId}
// returns HwTask list
router.post('/currentHwByClass', async function (req, res) {
    try {
        const {classId} = req.body;
        const result = await hwController.getCurrentHwByClass(classId);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// get planned homework for a teacher: needs classId as {classId}
// returns HwTask list
router.post('/plannedHwByClass', async function (req, res) {
    try {
        const {classId} = req.body;
        const result = await hwController.getPlannedHwByClass(classId);
        res.status(200).json(result);
    } catch (error) {
        res.status(410).json({ message: error.message });
    }
});

// get past homework for a teacher: needs classId as {classId}
// returns HwTask list
router.post('/pastHwByClass', async function (req, res) {
    try {
        const {classId} = req.body;
        const result = await hwController.getPastHwByClass(classId);
        res.status(200).json(result);
    } catch (error) {
        res.status(411).json({ message: error.message });
    }
});

// get current homework for a student: needs student username as {username}
// returns HwTask object
router.post('/currentHwForStudent', async function (req, res) {
    try {
        const {username} = req.body;
        const result = await hwController.getCurrentHwForStudent(username);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// get overdue homework for a student: needs student username as {username}
// returns HwTask object
router.post('/lateHwForStudent', async function (req, res) {
    try {
        const {username} = req.body;
        const result = await hwController.getLateHwForStudent(username);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// get done homework for student: needs student username as {username}
// returns HwTask object
router.post('/doneHwForStudent', async function (req, res) {
    try {
        const {username} = req.body;
        const result = await hwController.getDoneHwForStudent(username);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// get  graded homework for student (sorted by newly graded?): needs student username as {username}
// list of tuple?: [{hwTask, grading}, {hwTask, grading}, ...]
router.post('/gradedHwForStudent', async function (req, res) {
    try {
        const {username} = req.body;
        const result = await hwController.getGradedHwForStudent(username);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// get article url of a homework task by hw task id, needs {hwTaskId}
router.post('/getArticleUrlForHwTask', async function (req, res) {
    try {
        const {hwTaskId} = req.body;
        const result = await hwController.getArticleUrlForHwTask(hwTaskId);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// add article url to a homework task by hw task id, needs {articleTitle, articleUrl}
router.post('/addArticleUrlToHwTask', async function (req, res) {
    try {
        const {articleTitle, articleUrl} = req.body;
        const result = await hwController.addArticleUrlToHwTask(articleTitle, articleUrl);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// add new homework task: needs {classId, title, description, gradingCategories, startDate, dueDate}
// gradingCategories: {{topic = "Language": {category1, category2,...}}, {topic = "Media": {cat1, cat2}}?
router.post('/addNewHw', async function (req, res) {
    try {
        const {classId, title, description, gradingCategories, startDate, dueDate} = req.body;
        const newHw = new HwTask(title, description, "tbd", "tbd", gradingCategories, startDate, dueDate);
        const result = await hwController.addNewHwTask(classId, newHw);
        res.status(200).json(result);
    } catch (error) {
        res.status(412).json({ message: error.message });
    }
});

// add grading category: needs topic the category was added to, new category {topic, newGradingCategory}
router.post('/addGradingCategory', async function (req, res) {
    try {
        const {topic, newGradingCategory} = req.body;
        const result = await hwController.addGradingCategory(topic, newGradingCategory);
        res.status(200).json(result);
    } catch (error) {
        res.status(413).json({ message: error.message });
    }
});


