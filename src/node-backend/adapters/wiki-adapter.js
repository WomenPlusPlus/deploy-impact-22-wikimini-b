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
    // params.errorformat = 'raw';
    // params.errorsuselocal = true;
    return wiki.request(params);
}

export function overwriteToken(token) {
    wiki.csrfToken = token;
}

export async function login(credentials) {
    return wiki.login(credentials);
}

export async function getEditToken() {
    return wiki.getCsrfToken();
}

export async function getAccountCreationToken() {
    return getTokenOfType("createaccount");
}

export async function getTokenOfType(type) {
    const tokenResponse = await wiki.request({
        action: "query",
        meta: "tokens",
        type: type
    });
    const token = tokenResponse.query.tokens[type + "token"];
    return token;
}