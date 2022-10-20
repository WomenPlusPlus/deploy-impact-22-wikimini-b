


const { mwn } = require('mwn');

const wiki = new mwn();

// use async/await
export function signUp(username, password) {
    const token = wiki.createAccount(username, password).then({
        // set email, change to teacher user group
    });
    return token;
}