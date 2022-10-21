
const { mwn } = require('mwn');

const teacherUserGroup = "teacher";
const userRightsAction = "userrights";
const validatePasswordAction = "validatepassword";
const noSuchUserCode = "nosuchuser";
const userExistsCode = "userexists";

// init API connection -> should be somewhere else later probably, and we just pass the object?
const apiUrl = "http://localhost/mediawiki/api.php";
const wiki = new mwn({
    apiUrl: apiUrl
});

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
async function signUp(email, username, password, realName) {
    await wiki.request({
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
    await wiki.createAccount(username, password)
        .catch((e) => {
            if (e.code === noSuchUserCode) {
                throw Error("User does not exist, can't register as teacher");
            } else {
                throw Error("Error in creating new user: " + e);
            }
        });

    // either: login with a bot account that has the right to change usergroups (safety issue?),
    // or give every newly created user the possibility to change usergroups (doesn't seem like a good idea)
    await wiki.login({username, password});
    const token = await wiki.getCsrfToken();
    await wiki.request({
        action: userRightsAction,
        user: username,
        add: teacherUserGroup,
        reason: "New teacher's account creation",
        token: token,
        // add this or not?
        errorformat: 'html',
        errorsuselocal: true
    }).then(response => {
        if (response.userrights.added[0] === teacherUserGroup) {
            return "Successful";
        } else {
            throw Error(response.userrights); // should have a nicer format
        }
    }).catch(e => {
        throw Error("Error while trying to register the account as a teacher's account: " + e);
    });
}

