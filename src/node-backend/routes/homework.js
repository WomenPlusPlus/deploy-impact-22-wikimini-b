import express from "express";
import * as hwController from "../controller/homework-controller.js";
import {GradingCategory, HwTask} from "../models/domain-objects.js";
export const router = express.Router();

// complete path: /homework/...

// get current homework for a teacher: needs classId as {classId}
// returns HwTask lists as domain-objects.TeacherHwList {current: [hwTasks], planned: [hwTasks], past: [hwTasks]}
router.post('/hwByClass', async function (req, res) {
    try {
        const {classId} = req.body;
        const result = await hwController.getHwByClass(classId);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

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

// update article title to a homework task by hw task id, needs {taskId, articleTitle}
router.post('/updateArticleTitleForHwTask', async function (req, res) {
    try {
        const {taskId, articleTitle} = req.body;
        const result = await hwController.updateArticleTitleForHwTask(taskId, articleTitle);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// edit homework task (by teacher): {taskId, title, description, gradingCategories, startDate, dueDate}
router.post('/updateHwTask', async function (req, res) {
    try {
        const {taskId, title, description, gradingCategories, startDate, dueDate} = req.body;
        const taskWithUpdates = new HwTask(title, description, gradingCategories, startDate, dueDate);
        const result = await hwController.editHwTask(taskId, taskWithUpdates);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// homework task status change: {taskId, newStatus, datetime}
router.post('/changeHwTaskStatus', async function (req, res) {
    try {
        const {taskId, newStatus, datetime} = req.body;
        const result = await hwController.updateHwTaskStatus(taskId, newStatus, datetime);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// grade homework task: {taskId, gradings}
router.post('/gradeHwTask', async function (req, res) {
    try {
        const {taskId, gradings} = req.body;
        const result = await hwController.gradeHwTask(taskId, gradings);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// add new homework task: needs {classId, title, description, gradingCategories, startDate, dueDate}
// gradingCategories: {{topic = Topics.Language: {category1, category2,...}}, {topic = Topics.Media: {cat1, cat2}}?
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

// add grading category: needs topic the category was added to, new category {Topic, newGradingCategory}
router.post('/addGradingCategory', async function (req, res) {
    try {
        const {topic, newGradingCategory} = req.body;
        const newCat = new GradingCategory(topic, newGradingCategory);
        const result = await hwController.addGradingCategory(newCat);
        res.status(200).json(result);
    } catch (error) {
        res.status(413).json({ message: error.message });
    }
});


