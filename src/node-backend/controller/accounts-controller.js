import * as wikiAdapter from "../adapters/wiki-adapter.js";
import {Credentials} from "../models/account-models.js";
import {getAccountCreationToken} from "../adapters/wiki-adapter.js";

const teacherUserGroup = "teacher";
const userRightsAction = "userrights";
const validatePasswordAction = "validatepassword";
const noSuchUserCode = "nosuchuser";
const userExistsCode = "userexists";
const createAccountAction = "createaccount";

export const doTeacherSignUp = async (req, res) => {
    try {
        const {username, password, email} = req.body;
        const credentials = new Credentials(username, password, email);
        const teacherSignUpResult = await createTeacherAccount(credentials);
        res.status(200).json(teacherSignUpResult);
    } catch (error) {
        res.status(405).json({ message: error.message });
    }
}

export const confirmTeacherAccount = async (req, res) => {
    try {
        const {emailConfToken, username, password, email, chosenName} = req.body;
        const credentials = new Credentials(username, password, email);
        const confirmationResult = await confirmEmail(emailConfToken, credentials, chosenName);
        const registerAsTeacherResult = await registerUserAsTeacher(credentials);
        // join results
        res.status(200).json(confirmationResult);
    } catch (error) {
        res.status(406).json({message: error.message });
    }
}

async function createTeacherAccount(credentials = new Credentials()) {
    const username = credentials.username;
    const password = credentials.password;
    const email = credentials.email;

    await wikiAdapter.request({
        action: validatePasswordAction,
        password: password,
        user: username,
        email: email,
    }).catch(e => {
        if (e.code === userExistsCode) {
            throw Error("User already exists");
        }
    });

    const token = await wikiAdapter.getAccountCreationToken();
    const createAccountResult = await wikiAdapter.request({
        action: createAccountAction,
        username: username,
        password: password,
        retype: password,
        email: email,
        createtoken: token,
        createreturnurl: "http://localhost/mediawiki",
        reason: "Teacher account creation"
    }).catch((e) => {
        if (e.code === userExistsCode) {
            throw Error("User does already exist, can't register as teacher");
        } else {
            throw Error("Error in creating new user: " + e);
        }
    });

    return createAccountResult;

}

async function confirmEmail(emailConfToken, credentials = new Credentials(),
                                     realName = "") {
    // not tested yet, maybe we need to set the correct token again
    wikiAdapter.overwriteToken(emailConfToken);
    await wikiAdapter.login(credentials);
    const token = await wikiAdapter.getEditToken();

    await wikiAdapter.request({
        action: "useroptions",
        optionname: "realname",
        optionvalue: realName,
        token: token
    }).catch(e => {
        if (e.code === noSuchUserCode) {
            throw Error("No such user exists, account cannot be completed");
        } else {
            throw Error("Error while setting name " + e);
        }
    });
}

async function registerUserAsTeacher(credentials = new Credentials()) {
    // either: login with a bot account that has the right to change usergroups (safety issue?),
    // or give every newly created user the possibility to change usergroups (doesn't seem like a good idea)
    await wikiAdapter.login(credentials);
    const token = await wikiAdapter.getEditToken();
    await wikiAdapter.request({
        action: userRightsAction,
        user: credentials.username,
        add: teacherUserGroup,
        reason: "New teacher's account creation",
        token: token
    }).then(response => {
        if (response.userrights.added[0] === teacherUserGroup) {
            return "Successful"; // should be useful for frontend
        } else {
            throw Error(response.userrights); // should have a nicer format
        }
    }).catch(e => {
        throw Error("Error while trying to register the account as a teacher's account: " + e);
    });
}