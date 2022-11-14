import express from "express";
import * as articleController from "../controller/article-controller.js";
export const router = express.Router();

// complete path: /articles/...

// get article search results for search term, needs max number of results as resultLimit and search term as {searchTerm, resultLimit}
// format: [title1, title2, title3]
router.post('/searchArticles', async function (req, res) {
    try {
        const {searchTerm} = req.body;
        const result = await articleController.searchArticles(searchTerm);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// get article (title), return html
router.post('/getArticle', async function (req, res) {
    try {
        const {articleTitle} = req.body;
        const result = await articleController.getHtmlArticle(articleTitle);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// lock article for editing (how to implement?) needs {true or false} (lock/unlock)
router.post('/lockArticle', async function (req, res) {
    try {
        const {articleTitle} = req.body;
        const result = await articleController.lockArticle(articleTitle);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// update/save article
router.post('/saveArticle', async function (req, res) {
    try {
        const {articleTitle} = req.body;
        const result = await articleController.saveArticle(articleTitle);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// create new article (not published)
router.post('/createArticle', async function (req, res) {
    try {
        const {articleTitle} = req.body;
        const result = await articleController.createArticle(articleTitle);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

// approve and publish article
router.post('/approveArticle', async function (req, res) {
    try {
        const {articleTitle} = req.body;
        const result = await articleController.approveArticle(articleTitle);
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
