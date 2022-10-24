import express from "express";
import {doTeacherAccountCreation} from "../controller/signup-impl";

const router = express.Router();

// TODO is this correct?

router.get('/:id', doTeacherAccountCreation);

export default router;