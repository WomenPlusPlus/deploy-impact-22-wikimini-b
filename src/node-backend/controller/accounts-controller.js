import * as wikiAdapter from "../adapters/wiki-adapter.js";
import * as dbAdapter from "../adapters/database-adapter.js";
import { Credentials } from "../models/account-models.js";

const returnUrl = "http://localhost/mediawiki";
const teacherUserGroup = "teacher";
const userRightsAction = "userrights";
const validatePasswordAction = "validatepassword";
const noSuchUserCode = "nosuchuser";
const userExistsCode = "userexists";
const createAccountAction = "createaccount";
const loginAction = "clientlogin";

export const doTeacherSignUp = async (req, res) => {
  try {
    const { username, password, email } = req.body;
    const credentials = new Credentials(username, password, email);
    const teacherSignUpResult = await createNewAccount(credentials);
    res.status(200).json({ success: true, res: teacherSignUpResult });
  } catch (error) {
    res.status(405).json({ success: false, res: error.message });
  }
};
export const confirmTeacherAccount = async (req, res) => {
  try {
    const { emailConfToken, username, password, email, chosenName } = req.body;
    const credentials = new Credentials(username, password, email);
    const confirmationResult = await confirmEmail(
      emailConfToken,
      credentials,
      chosenName
    );
    const registerAsTeacherResult = await registerUserAsTeacher(credentials);
    // join results
    res.status(200).json(confirmationResult);
  } catch (error) {
    res.status(406).json({ message: error.message });
  }
};
export const doStudentSignUp = async (req, res) => {
  try {
    const { username, password, code } = req.body;
    // verify student code
    const studentInfos = await dbAdapter.verifyCode(code);
    // if valid, register student to classroom and teacher
    if (studentInfos.valid) {
      // invalidate code
      // dbAdapter.markCodeAsUsed(code);
      // add student to our db
      // dbAdapter.addStudent(username, studentInfos.result["assignedName"]);
      // register student to classroom
      // dbAdapter.enrollStudentInClass(username, className);
    } else {
      throw Error("The signup code is not valid");
    }
    // get teacher email
    // const email = dbAdapter.getTeacherEmailForClass(className);
    let email = "thewikifactory@gmail.com";
    const credentials = new Credentials(username, password, email);
    const studentSignUpResult = await createNewAccount(credentials);
    res.status(200).json(studentSignUpResult);
  } catch (error) {
    res.status(407).json({ message: error.message });
  }
};

export const doStudentLogin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const credentials = new Credentials(username, password);
    const loginResult = await login(credentials);
    res.status(200).json(loginResult);
  } catch (error) {
    res.status(408).json({ message: error.message });
  }
};

export const doTeacherLogin = async (req, res) => {
    try {
        const {user, password} = req.body;
        const userInfo = await dbAdapter.getTeacherInfo(user);
        if (userInfo['isVerified'] === 0) {
            throw Error("The user did not verify their email address, not proceeding with login");
        }
        const credentials = new Credentials(userInfo['username'], password);
        const loginResult = await login(credentials);
        res.status(200).json(loginResult);
    } catch (error) {
        res.status(408).json({ message: error.message });
    }
}

async function login(credentials = new Credentials()) {
  const token = await wikiAdapter.getTokenOfType("login");
  const loginResult = await wikiAdapter
    .request({
      action: loginAction,
      username: credentials.username,
      password: credentials.password,
      logintoken: token,
      loginreturnurl: returnUrl,
    })
    .catch((e) => {
      if (e.code === noSuchUserCode) {
        throw Error("No such user exists, can't login");
      } else {
        throw Error("Error while trying to log in: " + e);
      }
    });
    loginResult[loginAction]["token"] = await wikiAdapter.getEditToken();
    return loginResult;
}

async function createNewAccount(credentials = new Credentials()) {
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
            throw Error("User does already exist, can't register");
        } else {
            throw Error("Error while validating signup data" + e);
        }
    });

    const token = await wikiAdapter.getAccountCreationToken();
    return wikiAdapter.request({
        action: createAccountAction,
        username: username,
        password: password,
        retype: password,
        email: email,
        createtoken: token,
        createreturnurl: returnUrl,
        reason: "New account creation through Wikimini"
    }).catch((e) => {
        if (e.code === userExistsCode) {
            throw Error("User does already exist, can't register");
        } else {
            throw Error("Error in creating new user: " + e);
        }
    });
}

export async function sendTeacherConfirmationMail(username, email) {
    const authCode = Math.floor(Math.random() * 100000);
    const authCodeRegistered = await dbAdapter.registerTeacherAuthCode(username, authCode);
    if (!authCodeRegistered) {
        throw Error("Problem while saving auth code to database");
    }
    const subject = "Confirm your Wikimini account";
    const text = "Hello " + username + ", \nPlease confirm the account you just created on Wikimini by clicking on the following link: \n\n"
        + process.env.WEB_URL + "&username=" + username + "&authCode=" + authCode;
    return emailAdapter.sendEmail(email, subject, text);
}

async function registerUserAsTeacher(username) {
    // login with a bot account that has the right to change usergroups (safety issue?),
    const token = await wikiAdapter.getLocalEditToken();
    await wikiAdapter.request({
        action: userRightsAction,
        user: username,
        add: teacherUserGroup,
        reason: "New teacher's account creation",
        token: token
    }).then(response => {
        if (response.userrights.added[0] === teacherUserGroup) {
            return true;
        } else {
            throw Error("Error while trying to register the account as a teacher's account: " + response.userrights); // should have a nicer format
        }
    }).catch(e => {
        throw Error("Error while trying to register the account as a teacher's account: " + e);
    });
}
