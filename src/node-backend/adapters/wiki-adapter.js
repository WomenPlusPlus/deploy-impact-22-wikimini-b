// init API connection
const {mwn} = require("mwn");
const apiUrl = "http://localhost/mediawiki/api.php";
const wiki = new mwn({
    apiUrl: apiUrl
});

// TODO we could have all calls to the wiki in here, and return a readable callback/error object we define in api-models

export async function request(params) {
    // add this or not? --> for error handling task
    params.errorformat = 'html';
    params.errorsuselocal = true;
    return wiki.request(params);

    // TODO to be discussed: what do we want to return here?
    const defaultReturnObject = wiki.request(params);
    //extract data we need

    //convert to our own object and return
    return ourOwnObject;
}

export function overwriteToken(token) {
    wiki.csrfToken = token;
}

export async function login(credentials) {
    return wiki.login(credentials);
}

export async function getToken() {
    return wiki.getCsrfToken();
}