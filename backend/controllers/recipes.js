const Cuisine = require("../models/Cuisine");
const Searched = require("../models/SearchedRecipes");
const Categorized = require("../models/CategorizedRecipes");
const Recipe = require("../models/Recipe");

module.exports = {
  getCuisine: async (req, res) => {
    try {
      const cuisine = await Cuisine.find({ name: req.params.type });
      res.json(cuisine);
    } catch (error) {
      console.log(error);
    }
  },
  getSearched: async (req, res) => {
    try {
      const cuisine = await Searched.find({
        name: req.params.query,
      });
      res.json(cuisine);
    } catch (error) {
      console.log(error);
    }
  },
  createSearched: async (req, res) => {
    try {
      const searched = await Searched.create({
        name: req.body.name,
        data: req.body.data,
      });
      res.status(200).json(searched);
    } catch (error) {
      console.log(error);
    }
  },
  getRecipe: async (req, res) => {
    try {
      const info = await Recipe.find({ id: req.params.id });
      res.status(200).json(info);
    } catch (error) {
      res.status(401).send(error);
      console.log(error);
    }
  },
  createRecipe: async (req, res) => {
    try {
      const infoCreate = await Recipe.create({
        id: req.body.id,
        recipeTitle: req.body.recipeTitle,
        data: req.body.data,
        nutritions: req.body.nutritions,
        reviews: [],
      });
      res.status(200).json(infoCreate);
    } catch (error) {
      console.log(error);
    }
  },
  createReview: async (req, res) => {
    try {
      const recipe = await Recipe.findOneAndUpdate(
        {
          recipeTitle: req.body.recipeTitle,
        },
        {
          $push: {
            reviews: {
              userId: req.body.userId,
              nickname: req.body.nickname,
              comment: req.body.comment,
              starRating: req.body.starRating,
            },
          },
        },
        { new: true }
      );
      res.status(200).json({ recipe: recipe });
      return recipe;
    } catch (error) {
      res.status(401).send(error);
    }
  },
  getCategorized: async (req, res) => {
    try {
      const recipe = await Categorized.find({
        name: req.params.query,
      });
      res.json(recipe);
    } catch (error) {
      console.log(error);
    }
  },
  createCategorized: async (req, res) => {
    try {
      const categorized = await Categorized.create({
        name: req.body.name,
        data: req.body.data,
      });
      res.json(categorized);
    } catch (error) {
      console.log(error);
    }
  },
};
