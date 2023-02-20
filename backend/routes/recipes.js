const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipes");
const { upload } = require("../middleware/multer");

router.get("/getPopular", recipesController.getPopular);
router.get("/getVeggie", recipesController.getVeggie);
router.get("/cuisine/:type", recipesController.getCuisine);
router.get("/searched/:query", recipesController.getSearched);
router.get("/category/:query", recipesController.getCategorized);
router.post("/category/:query", recipesController.createCategorized);
router.post("/searched/:query", recipesController.createSearched);
router.get("/recipe/:id", recipesController.getInfo);
router.post("/recipe/:id", recipesController.createInfo);
// router.get("/favorites", recipesController.getFavorite);
// router.post("/favorites", recipesController.createFavorite);
// router.delete("/favorites", recipesController.deleteFavorite);

module.exports = router;
