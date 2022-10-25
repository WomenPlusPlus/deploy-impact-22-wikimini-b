// init API connection
const {mwn} = require("mwn");
const apiUrl = "http://localhost/mediawiki/api.php";
const wiki = new mwn({
    apiUrl: apiUrl
});

// TODO we could have all calls to the wiki in here, and return a readable callback/error object we define in api-models

export async function request(params) {
    // add this or not? --> for error handling task
    params.errorformat = 'json';
    params.errorsuselocal = true;
    return wiki.request(params);
}

export function overwriteToken(token) {
    wiki.csrfToken = token;
}

export async function login(credentials) {
    return wiki.login(credentials.username, credentials.password);
}

export async function getToken() {
    return wiki.getCsrfToken();
}