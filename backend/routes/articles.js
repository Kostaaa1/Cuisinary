const express = require("express");
const router = express.Router();
const ArticlesController = require("../controllers/articles");

router.get("/getArticles", ArticlesController.getArticles);

module.exports = router;
