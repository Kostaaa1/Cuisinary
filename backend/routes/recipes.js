const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipes");
const { upload } = require("../middleware/multer");

// router.get("/getPopular", recipesController.getPopular);
// router.get("/getVeggie", recipesController.getVeggie);
router.get("/cuisine/:type", recipesController.getCuisine);
router.get("/category/:query", recipesController.getCategorized);
router.post("/category/:query/createCategory", recipesController.createCategorized);
router.get("/searched/:query", recipesController.getSearched);
router.post("/searched/createSearched", recipesController.createSearched);
router.get("/recipe/:id", recipesController.getRecipe);
router.post("/recipe/createRecipe", recipesController.createRecipe);
router.post("/recipe/:id/createReview", recipesController.createReview);
// router.get("/favorites", recipesController.getFavorite);
// router.post("/favorites", recipesController.createFavorite);
// router.delete("/favorites", recipesController.deleteFavorite);

module.exports = router;
