import express from "express";
import * as signupImpl from "./signup-impl";

const router = express.Router(); // where is this used?

export const doTeacherSignUp = async (req, res) => {
    try {
        const {username, password, email} = req.body;
        const credentials = new Credentials(username, password, email);
        const teacherSignUpResult = await signupImpl.doTeacherAccountCreation(credentials);
        res.status(200).json(teacherSignUpResult);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const confirmTeacherAccount = async (req, res) => {
    try {
        const {emailConfToken, username, password, email, chosenName} = req.body;
        const credentials = new Credentials(username, password, email);
        const confirmationResult = await signupImpl.confirmTeacherAccount(emailConfToken, credentials, chosenName);
        res.status(200).json(confirmationResult);
    } catch (error) {
        res.status(404).json({message: error.message });
    }
}