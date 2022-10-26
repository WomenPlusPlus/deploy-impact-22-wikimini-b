import {mwn} from "mwn";
import {credentials} from "./connection-data.js";

const apiUrl = "http://localhost/mediawiki/api.php";

const wiki = await mwn.init({
    apiUrl: apiUrl,
    username: credentials.username,
    password: credentials.password
});

export async function request(params) {
    // add this or not? --> for error handling task
    // params.errorformat = 'json';
    // params.errorsuselocal = true;
    return wiki.request(params);
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