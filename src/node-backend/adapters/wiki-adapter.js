import {mwn} from "mwn";
import * as dotenv from 'dotenv'

dotenv.config()

const wiki = await mwn.init({
    apiUrl: process.env.API_URL,
    username: process.env.WIKI_USER,
    password: process.env.WIKI_PASS
}).catch(e => {
    console.error("Problem connecting to MediaWiki API: " + e);
});

export async function request(params) {
    // add this or not? --> for error handling task
    // params.errorformat = 'raw';
    // params.errorsuselocal = true;
    return wiki.request(params);
}

export async function createEmptyArticleInCategory(articleTitle, categoryName) {
    return wiki.create(articleTitle,
        'This is a newly created article! Edit it to add content ' + '[[Category:' + categoryName + ']]',
        'New article');
}

// export async function login(credentials) {
//     return wiki.login(credentials);
// }

export async function getEditToken() {
    return getTokenOfType("csrf");
}

export async function getLocalEditToken() {
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
    return tokenResponse.query.tokens[type + "token"];
}