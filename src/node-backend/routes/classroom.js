import express from "express";
import * as classroomController from "../controller/classroom-controller.js";

import { JoiningStudent } from "../models/domain-objects.js";
export const router = express.Router();

router.post('JoiningStudent', async function (req, res) {
    try {
        const {username} = req.body;
        
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.post('saveStudents', async function (req, res) {
    try {
        const {username} = req.body;
   
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.post('addStudentList', async function (req, res) {
    try {
        const {username} = req.body;

        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});
router.post('editStudentList', async function (req, res) {
    try {
        const {username} = req.body;

        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

