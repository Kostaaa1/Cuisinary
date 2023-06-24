const Searched = require("../models/SearchedRecipes");
const Categorized = require("../models/CategorizedRecipes");
const { Recipe, Review } = require("../models/Recipe");
const axios = require("axios");
const { Configuration, OpenAIApi } = require("openai");
const User = require("../models/User");
const cloudinary = require("../middleware/cloudinary");

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

const extractKeyword = async (word) => {
  try {
    if (word) {
      const prompt = `I want to fetch the data based on one word that is related to food. This is the name of the recipe: "${word}". I want you to extract the key/main word out of the name of the recipe that i provided that is related to food, so I can make the fetch for the similar word! Your response needs to be only that one word! For example, in the recipe name: "Mexican Lasagna with Chicken & Black Bean", the potential keyword would be "Chicken", then i would be able to make further fetches!`;

      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 2048,
        temperature: 1,
      });

      let keyword = response.data.choices[0].text;

      keyword = keyword
        .trim()
        .replace(/[^a-zA-Z"]/g, "")
        .toLowerCase();

      console.log(keyword, "final word: from extract function");
      return keyword;
    }
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getSimilarRecipes: async (req, res) => {
    try {
      const query = req.params.query.toLowerCase();
      const checkParams = await Searched.findOne({
        name: { $in: query.split(" ") },
      });
      console.log(req.params, "step 1: check if the keyword exists");

      if (!checkParams) {
        const keyword = await extractKeyword(query);
        const recipe = await Searched.findOne({ name: keyword });

        if (!recipe) {
          const response = await axios.get(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}&number=60&query=${keyword}`
          );

          const similar = await Searched.create({
            name: keyword.trim().toLowerCase().split('"').join(""),
            data: response.data.results,
          });

          res.status(201).json(similar);
          return;
        }

        res.status(200).json(recipe);
      } else {
        console.log(checkParams);
        res.status(200).json(checkParams);
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getSearched: async (req, res) => {
    try {
      const cuisine = await Searched.find({
        name: req.params.query,
      });
      res.status(200).json(cuisine);
    } catch (error) {
      console.log(error);
    }
  },
  createSearched: async (req, res) => {
    try {
      const { name, data } = req.body;
      if (!name || !data) return;

      const searched = await Searched.create({
        name: name,
        data: data,
      });
      res.status(200).json(searched);
    } catch (error) {
      console.log(error);
    }
  },
  createRecipe: async (req, res) => {
    try {
      const { path } = req.file;
      const result = await cloudinary.uploader.upload(path);

      const form = JSON.parse(req.body.form);
      const recipeTitle = form.title;

      const data = {
        ...form,
        postedBy: req.params.nickname,
        image: result.secure_url,
      };

      const newRecipe = {
        recipeTitle: recipeTitle,
        data,
        reviews: [],
      };

      const recipe = await Recipe.create(newRecipe);
      res.status(200).json(recipe);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  getRecipe: async (req, res) => {
    try {
      const { id } = req.params;
      const recipe = await Recipe.findOne({ id });

      if (!recipe) {
        const recipeRes = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}&includeNutrition=true`
        );

        const createRecipe = await Recipe.create({
          id: recipeRes.data.id,
          recipeTitle: recipeRes.data.title,
          data: recipeRes.data,
        });

        res.status(201).json([createRecipe, []]);
        return;
      }

      const reviews = await Review.find({ _id: { $in: recipe.reviews } });
      res.status(200).json([recipe, reviews]);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  createRecipeReview: async (req, res) => {
    try {
      const { recipeTitle, userId, comment, starRating } = req.body;

      const user = await User.findById(userId);

      const review = new Review({
        userId,
        userImage: user.picture?.image || "",
        nickname: user.nickname || "",
        comment,
        starRating,
      });

      await review.save();
      await Recipe.findOneAndUpdate(
        { recipeTitle: recipeTitle },
        { $push: { reviews: { $each: [review._id], $position: 0 } } },
        { new: true }
      );

      const recipeReviews = await Recipe.findOne({ id: req.params.id });
      const reviews = await Review.find({
        _id: { $in: recipeReviews.reviews },
      });

      res.status(200).json(reviews);
    } catch (error) {
      res.status(404).send(error.message);
    }
  },
  editRecipeReview: async (req, res) => {
    try {
      const { recipeId, userId, nickname, comment, starRating } = req.body;
      const user = await User.findById(userId);

      await Review.findOneAndUpdate(
        {
          _id: recipeId,
        },
        {
          $set: {
            userId: userId,
            nickname: user.nickname,
            userImage: user.picture.image || "",
            comment: comment,
            starRating: starRating,
          },
        },
        { new: true }
      );

      const recipeReviews = await Recipe.findOne({ id: req.params.id });
      const reviews = await Review.find({
        _id: { $in: recipeReviews.reviews },
      });

      res.status(200).json(reviews);
    } catch (error) {
      res.status(401).send(error);
    }
  },
  getCategorized: async (req, res) => {
    try {
      const recipe = await Categorized.find({
        name: req.params.query,
      });
      res.status(200).json(recipe);
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
      res.json("Created Category");
    } catch (error) {
      console.log(error);
    }
  },
};
