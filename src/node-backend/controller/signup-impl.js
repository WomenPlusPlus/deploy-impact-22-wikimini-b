import * as wikiAdapter from "../adapters/wiki-adapter";

const teacherUserGroup = "teacher";
const userRightsAction = "userrights";
const validatePasswordAction = "validatepassword";
const noSuchUserCode = "nosuchuser";
const userExistsCode = "userexists";
const createAccountAction = "createaccount";

// Code used for local testing:
 const testUser = "exampleUser2";
 const testPw = "xtfpds";
 const testEmail = "luciana.kolbeck@ik.me";
 const testName = "Ms Teacher";
 const emailConfToken = "123/+";
 const testCred = new Credentials(testUser, testPw, testEmail);

 // try signUp
 try {
     doTeacherAccountCreation(testCred)
         .then(token => console.log("Created with token: " + token.toString()))
         .catch(e => console.log("Error during signup: " + e));

     completeTeacherAccount(emailConfToken, testCred, testName)
         .then(obj => console.log("Email confirmed, account created: " + obj.toString()))
         .catch(e => console.log("Error during confirmation etc: " + e));
 } catch (e) {
     console.log("Error: " + e);
 }



// TODO where should this code be?

export async function doTeacherAccountCreation(credentials = new Credentials()) {
    // does this work?
    if (typeof credentials !== Credentials) {
        throw Error("Credentials are missing for teacher signup");
    }
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

    const token = await wikiAdapter.getToken();
    await wikiAdapter.request({
        action: createAccountAction,
        username: username,
        password: password,
        email: email,
        createtoken: token  // I still need to test this
        // createreturnurl: returnUrl // possible if necessary, but probably not necessary
    }).catch((e) => {
            if (e.code === userExistsCode) {
                throw Error("User does already exist, can't register as teacher");
            } else {
                throw Error("Error in creating new user: " + e);
            }
    });
}

export async function completeTeacherAccount(emailConfToken, credentials = new Credentials(),
                                             realName = "") {
    // not tested yet, maybe we need to set the correct token again
    wikiAdapter.overwriteToken(emailConfToken);
    await wikiAdapter.login(credentials);
    const token = await wikiAdapter.getToken();

    await wikiAdapter.request({
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
    return registerUserAsTeacher(credentials);
}

async function registerUserAsTeacher(credentials = new Credentials()) {
    // either: login with a bot account that has the right to change usergroups (safety issue?),
    // or give every newly created user the possibility to change usergroups (doesn't seem like a good idea)
    await wikiAdapter.login(credentials);
    const token = await wikiAdapter.getToken();
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

