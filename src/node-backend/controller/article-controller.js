import * as wikiAdapter from "../adapters/wiki-adapter.js"
import {Lock, SearchResult} from "../models/domain-objects.js";

const protectAction = "protect";
const queryAction = "query";
const searchAction = "opensearch";
const listRandom = "random";
const listProtected = "protectedtitles";
const listCategories = "allcategories";
const titleKey = "title";
const lockProtection = "edit-locked";
const protectionsKey = "protections";
const editAction = "edit";
const editKey = "edit";

export async function getRandomArticles(numberOfRandomArticles) {
    const apiResponse = await wikiAdapter.request({
        action: queryAction,
        list: listRandom,
        rnnamespace: "0",
        rnlimit: numberOfRandomArticles
    });
    const pages = apiResponse[queryAction][listRandom];
    return pages.flatMap(o => o[titleKey]);
}

export async function saveArticle(articleTitle, articleContent) {
    const token = await wikiAdapter.getEditToken();
    const categories = await wikiAdapter.getCategoriesAsString(articleTitle);
    const result = await wikiAdapter.request({
        action: editAction,
        title: articleTitle,
        text: articleContent + categories,
        nocreate: 1,
        token: token
    });
    if (result[editAction]["result"] === "Success") {
        return true;
    } else {
        throw new Error("Error while trying to save article: " + result);
    }
}

export async function approveArticle(articleTitle) {
    
}

export async function createArticle(articleTitle, categoryName) {
    return await wikiAdapter.createEmptyArticleInCategory(articleTitle, categoryName);
}

export async function lockArticle(articleTitle, lockSwitch) {
    if (lockSwitch === Lock.Lock) {
        // lock article
        return lock(articleTitle);
    } else if (lockSwitch === Lock.Unlock) {
        // unlock article
        return unlock(articleTitle);
    } else {
        throw Error("Invalid value passed for locking or unlocking article: " + lockSwitch)
    }
}

export async function isArticleLocked(articleTitle) {
    const result = await wikiAdapter.request({
        action: queryAction,
        list: listProtected,
        ptnamespace: "0",
        ptlevel: lockProtection
    });
    const protectedArticles = result[queryAction][listProtected];
    if (articleTitle in protectedArticles) {
        return Lock.Lock;
    } else {
        return Lock.Unlock;
    }
}

function hoursLater(hours) {
    const date = new Date(Date.now() + hours * 3600 * 1000);
    return date.toLocaleString();
}

async function lock(articleTitle) {
    const token = await wikiAdapter.getLocalEditToken();
    const apiResponse = await wikiAdapter.request({
        action: protectAction,
        title: articleTitle,
        protections: editKey + "=" + lockProtection,
        expiry: hoursLater(2), // article stays locked for two hours
        token: token
    });
    const protections = apiResponse[protectAction][protectionsKey];
    if (protections.length === 1 && protections[0][editKey] === lockProtection) {
        return true;
    } else {
        throw Error("Error while trying to lock article: " + JSON.stringify(apiResponse));
    }
}

async function unlock(articleTitle) {
    const token = await wikiAdapter.getLocalEditToken();
    const apiResponse = await wikiAdapter.request({
        action: protectAction,
        title: articleTitle,
        protections: "",
        expiry: "infinite",
        token: token
    });
    if (apiResponse[protectAction][protectionsKey].length === 0) {
        return true;
    } else {
        throw Error("Error while unlocking article: " + apiResponse);
    }
}

export async function getHtmlArticle(articleTitle) {
    
}

export async function searchArticles(searchTerm, resultLimit) {
    const apiResponse = await wikiAdapter.request({
        action: searchAction,
        search: searchTerm,
        namespace: 0,
        limit: resultLimit
    });
    const searchTermResponse = apiResponse[0];
    const articles = apiResponse[1];
    const descriptions = apiResponse[2];
    const links = apiResponse[3];
    return new SearchResult(searchTermResponse, articles, descriptions, links);
}

export async function getCategories() {
    const apiResponse = await wikiAdapter.request({
        action: queryAction,
        list: listCategories,
        aclimit: "500"
    });
    return apiResponse[queryAction][listCategories].flatMap(cat => cat["category"]);
}

export async function getCategoryOfArticle(articleName) {
    return wikiAdapter.getCategoriesOfArticle(articleName);
}

export async function addCategoriesToArticle(articleName, categories) {
    let categoriesString = "";
    categories.forEach(cat => {
        categoriesString += " [[Category:" + cat + "]] ";
    })
    const token = await wikiAdapter.getEditToken();
    const apiResponse = await wikiAdapter.request({
        action: editAction,
        title: articleName,
        nocreate: 1,
        appendtext: categoriesString,
        token: token
    });
    if (apiResponse[editAction]["result"] === "Success") {
        return true;
    } else {
        throw new Error("Error while trying to add categories to article: " + apiResponse);
    }
}
