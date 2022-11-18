import express from "express";
import * as articleController from "../controller/article-controller.js";
export const router = express.Router();

// complete path: /articles/...

// get article search results for search term, needs max number of results as resultLimit and search term as {searchTerm, resultLimit}
// returns SearchResult object
router.post('/searchArticles', async function (req, res) {
    try {
        const {searchTerm, resultLimit} = req.body;
        const result = await articleController.searchArticles(searchTerm, resultLimit);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// lock article for editing: needs {articleTitle, lockSwitch} lockSwitch should be Lock.Lock or Lock.Unlock
router.post('/lockArticle', async function (req, res) {
    try {
        const {articleTitle, lockSwitch} = req.body;
        const result = await articleController.lockArticle(articleTitle, lockSwitch);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// check if article is locked, needs {articleTitle}, returns Lock.Lock or Lock.Unlock
router.post('/isArticleLocked', async function (req, res) {
    try {
        const {articleTitle} = req.body;
        const result = await articleController.isArticleLocked(articleTitle);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// update/save article, needs {articleTitle, articleContent}, returns true is it worked
router.post('/saveArticle', async function (req, res) {
    try {
        const {articleTitle, articleContent} = req.body;
        const result = await articleController.saveArticle(articleTitle, articleContent);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// create new article, needs {articleTitle, categoryName}, leave categoryName as "" to not add any category
router.post('/createArticle', async function (req, res) {
    try {
        const {articleTitle, categoryName} = req.body;
        const result = await articleController.createArticle(articleTitle, categoryName);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// get random articles needs {numberOfRandomArticles}
router.post('/getRandomArticles', async function (req, res) {
    try {
        const {numberOfRandomArticles} = req.body;
        const result = await articleController.getRandomArticles(numberOfRandomArticles);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// get article categories, doesn't need input
router.post('/getCategories', async function (req, res) {
    try {
        const result = await articleController.getCategories();
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// get categories of article, needs {articleName}, returns list of category names as ["Category:Name"]
router.post('/getCategoriesOfArticle', async function (req, res) {
    try {
        const {articleName} = req.body;
        const result = await articleController.getCategoryOfArticle(articleName);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// set categories of article, needs articleName and list of category names to add as {articleName, categories}
router.post('/addCategoriesToArticle', async function (req, res) {
    try {
        const {articleName, categories} = req.body;
        const result = await articleController.addCategoriesToArticle(articleName, categories);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});
