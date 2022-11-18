import * as wikiAdapter from "../adapters/wiki-adapter.js"
import {Lock} from "../models/domain-objects.js";

const protectAction = "protect";
const queryAction = "query";
const listRandom = "random";
const titleKey = "title";
const lockProtection = "edit-locked";
const protectionsKey = "protections";
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
    return wikiAdapter.request({
        action: "edit",
        title: articleTitle,
        text: articleContent + categories,
        nocreate: 1,
        token: token
    });
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

export async function searchArticles(searchTerm) {

}
