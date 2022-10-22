import * as wikiAdapter from "./wiki-adapter";

const teacherUserGroup = "teacher";
const userRightsAction = "userrights";
const validatePasswordAction = "validatepassword";
const noSuchUserCode = "nosuchuser";
const userExistsCode = "userexists";

 //Code used for local testing:

 // const testUser = "exampleUser";
 // const testPw = "xtfpds";
 // const testEmail = "email";
 // const testName = "Ms Teacher";
 //
 // // try signUp
 // try {
 //     signUp(testEmail, testUser, testPw, testName)
 //         .then(token => console.log(token.toString()))
 //         .catch(e => console.log("Error during signup: " + e));
 // } catch (e) {
 //     console.log("Error during signup: " + e);
 // }

// do sign up
export async function doTeacherSignUp(fullCredentials) {
    // does this work?
    if (typeof fullCredentials !== FullCredentials) {
        throw Error("Credentials are missing for teacher signup");
    }
    let username = fullCredentials.username;
    let password = fullCredentials.password;
    const email = fullCredentials.email;
    const realName = fullCredentials.realName;
    await wikiAdapter.request({
        action: validatePasswordAction,
        password: password,
        user: username,
        email: email,
        realname: realName
    }).catch(e => {
        if (e.code === userExistsCode) {
            throw Error("User already exists");
        }
    });
    await wikiAdapter.createAccount(fullCredentials)
        .catch((e) => {
            if (e.code === noSuchUserCode) {
                throw Error("User does not exist, can't register as teacher");
            } else {
                throw Error("Error in creating new user: " + e);
            }
    });

    // either: login with a bot account that has the right to change usergroups (safety issue?),
    // or give every newly created user the possibility to change usergroups (doesn't seem like a good idea)
    await wikiAdapter.login(fullCredentials);
    const token = await wikiAdapter.getToken();
    await wikiAdapter.request({
        action: userRightsAction,
        user: username,
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

