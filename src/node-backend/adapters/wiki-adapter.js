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
    return wiki.request(params);
}

export async function createEmptyArticleInCategory(articleTitle, categoryName) {
    let category = "";
    if (categoryName !== "") {
        category = "[[Category:" + categoryName + "]]";
    }
    return wiki.create(articleTitle, "This is a newly created article! Edit it to add content " + category,
        "New article");
}

export async function getCategoriesOfArticle(articleTitle) {
    const response = await request({
        action: "query",
        prop: "categories",
        titles: articleTitle
    });
    const categories = response["query"]["pages"][0]["categories"];
    if (typeof categories !== "undefined") {
        return categories.flatMap(cat => cat["title"]);
    } else {
        return [];
    }
}

export async function getCategoriesAsString(articleTitle) {
    const categories = getCategoriesOfArticle(articleTitle);
    return categories.flatMap(cat => " [[" + cat + "]] ");
}

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