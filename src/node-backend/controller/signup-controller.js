import express from "express";
import * as signupAdapter from "../adapters/signup-adapter";

const router = express.Router(); // where is this used?

export const doTeacherSignUp = async (req, res) => {
    try {
        // TODO not sure how I can pass the required parameters here correctly
        const credentials = new FullCredentials(username, password, email, realName);
        const teacherSignUpResult = await signupAdapter.doTeacherSignUp(credentials);
        res.status(200).json(teacherSignUpResult);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}