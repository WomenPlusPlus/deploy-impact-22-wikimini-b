// init API connection -> should be somewhere else later probably, and we just pass the object?
const {mwn} = require("mwn");
const apiUrl = "http://localhost/mediawiki/api.php";
const wiki = new mwn({
    apiUrl: apiUrl
});

// we could have all calls to the wiki in here, and return a readable callback/error object we define in api-models
export async function request(params) {
    // add this or not?
    params.errorformat = 'html';
    params.errorsuselocal = true;
    return wiki.request(params);

    // to be discussed
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