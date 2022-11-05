import express from "express";
import * as hwController from "../controller/homework-controller.js";
import {HwTask} from "../models/domain-objects.js";
export const router = express.Router();

// complete path: /homework/...

// get current homework for a teacher: needs classId as {classId}
router.post('/currentHwByTeacher', async function (req, res) {
    try {
        const {classId} = req.body;
        const result = await hwController.getCurrentHwByTeacher(classId);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// get planned homework for a teacher: needs classId as {classId}
router.post('/plannedHwByTeacher', async function (req, res) {
    try {
        const {classId} = req.body;
        const result = await hwController.getPlannedHwByTeacher(classId);
        res.status(200).json(result);
    } catch (error) {
        res.status(410).json({ message: error.message });
    }
});

// get past homework for a teacher: needs classId as {classId}
router.post('/pastHwByTeacher', async function (req, res) {
    try {
        const {classId} = req.body;
        const result = await hwController.getPastHwByTeacher(classId);
        res.status(200).json(result);
    } catch (error) {
        res.status(411).json({ message: error.message });
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

