import express from "express";
import {doTeacherSignUp} from "../adapters/signup-adapter";

const router = express.Router();

router.get('/:id', doTeacherSignUp);

export default router;