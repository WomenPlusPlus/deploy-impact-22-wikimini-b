import express from "express";
import * as signupImpl from "./signup-impl";

const router = express.Router(); // where is this used?

export const doTeacherSignUp = async (req, res) => {
    try {
        // not sure how I can pass the required parameters here correctly
        const credentials = new Credentials();
        const teacherSignUpResult = await signupImpl.doTeacherAccountCreation(credentials);
        res.status(200).json(teacherSignUpResult);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}