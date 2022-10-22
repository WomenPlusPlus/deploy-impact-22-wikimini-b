import express from "express";
import {doTeacherAccountCreation} from "../adapters/signup-adapter";

const router = express.Router();

router.get('/:id', doTeacherAccountCreation);

export default router;