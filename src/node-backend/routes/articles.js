import express from "express";
import * as articleController from "../controller/article-controller.js";
export const router = express.Router();

// complete path: /articles/...

// get article search results for search term, needs max number of results as resultLimit and search term as {searchTerm, resultLimit}
// format: [{title, articleUrl}, {title, articleUrl}, ...]
router.post('/searchArticles', async function (req, res) {
    try {
        const {searchTerm} = req.body;
        const result = await articleController.searchArticles(searchTerm);
        res.status(200).json(result);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});