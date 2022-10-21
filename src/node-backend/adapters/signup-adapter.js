const { mwn } = require('mwn');

const testUser = "exampleTeacher";
const testPw = "xtfpds";

// init API connection

const wiki = new mwn({
    apiUrl: "localhost/mediawiki/api.php"
});

// try signUp
try {
    signUp(testUser, testPw).then(token => console.log(token.toString()));
} catch (e) {
    console.log("Error during signup: " + e);
}

// do signUp
async function signUp(username, password) {
    return wiki.createAccount(username, password);
}