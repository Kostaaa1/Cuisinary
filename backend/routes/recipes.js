const express = require("express");
const router = express.Router();
const recipesController = require("../controllers/recipes");
const { upload } = require("../middleware/multer");

router.get("/recipe/:id/getRecipe", recipesController.getRecipe);
router.get(
  "/recipe/:query/:recipeId/getSimilarRecipes",
  recipesController.getSimilarRecipes
);
router.post(
  "/recipe/:nickname/createRecipe",
  upload.single("image"),
  recipesController.createRecipe
);

// Recipe Reviews
router.post(
  "/recipe/:id/createRecipeReview",
  recipesController.createRecipeReview
);
router.post("/recipe/:id/editRecipeReview", recipesController.editRecipeReview);

// Searched of Recipes:
router.get("/searched/:query", recipesController.getSearched);
router.post("/searched/createSearched", recipesController.createSearched);

// Categories of Recipes:
router.get("/category/:query", recipesController.getCategorized);
router.post(
  "/category/:query/createCategory",
  recipesController.createCategorized
);

module.exports = router;
