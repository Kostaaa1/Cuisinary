const Searched = require("../models/SearchedRecipes");
const Categorized = require("../models/CategorizedRecipes");
const { Recipe, Review } = require("../models/Recipe");
const axios = require("axios");
const User = require("../models/User");
const cloudinary = require("../middleware/cloudinary");
const natural = require("natural");
const TfIdf = natural.TfIdf;

const extractKeyword = async (word) => {
  const tfidf = new TfIdf();
  tfidf.addDocument(word);
  const keyword = tfidf.listTerms(0)[0].term;
  return keyword;
};

module.exports = {
  getSimilarRecipes: async (req, res) => {
    try {
      const query = req.params.query.toLowerCase();
      const { recipeId } = req.params;

      const checkParams = await Searched.findOne({
        name: { $in: query.split(" ") },
      });

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

          res.status(201).json({ ...similar._doc, recipeId });
          return;
        }
        res.status(200).json({ ...recipe._doc, recipeId });
      } else {
        res.status(200).json({ ...checkParams._doc, recipeId });
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
      console.log(cuisine);
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
          averageRate: 0,
        });

        res.status(201).json([createRecipe, []]);
        return;
      }

      const reviews = await Review.find({
        _id: { $in: recipe.reviews },
      })
        .populate("userImage", "picture.image -_id")
        .populate("nickname", "nickname -_id");

      const formattedReviews = reviews.map((review) => ({
        ...review._doc,
        nickname: review.nickname.nickname,
        userImage: review?.userImage.picture.image,
      }));

      res.status(200).json([recipe, formattedReviews]);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  createRecipeReview: async (req, res) => {
    try {
      const { recipeTitle, recipeImage, recipeId, userId, comment, starRating, averageRate } =
        req.body;
      const user = await User.findById(userId);

      const review = await Review.create({
        userId,
        userImage: userId,
        nickname: userId,
        // userImage: user.picture?.image || "",
        comment,
        starRating,
        recipeId,
        recipeTitle,
        recipeImage,
      });

      user.reviews.push(review._id);
      await user.save();

      const updatedRecipe = await Recipe.findOneAndUpdate(
        { recipeTitle },
        {
          $push: { reviews: { $each: [review._id], $position: 0 } },
          $set: { averageRate },
        },
        { new: true }
      );

      const populated = await Recipe.findOne({ id: req.params.id })
        .populate({
          path: "reviews",
          populate: {
            path: "userImage",
            select: "picture.image -_id",
          },
        })
        .populate({
          path: "reviews",
          populate: {
            path: "nickname",
            select: "nickname -_id",
          },
        });

      const sendData = {
        updatedAverage: updatedRecipe.averageRate,
        reviews: populated.reviews.map((review) => ({
          ...review._doc,
          nickname: review.nickname.nickname,
          userImage: review?.userImage.picture.image,
        })),
      };

      res.status(200).json(sendData);
    } catch (error) {
      res.status(404).send(error.message);
    }
  },
  editRecipeReview: async (req, res) => {
    try {
      const { recipeId, userId, comment, starRating, averageRate } = req.body;

      const displayDate = () => {
        const date = new Date();
        const mm = date.getMonth() + 1;
        const dd = date.getDate();
        const yyyy = date.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
      };
      const currentDate = displayDate();

      await Review.findOneAndUpdate(
        {
          _id: recipeId,
        },
        {
          $set: {
            comment,
            starRating,
            displayDate: currentDate,
            createdAt: new Date(),
          },
        },
        { new: true }
      );

      const recipe = await Recipe.findOneAndUpdate(
        { id: req.params.id },
        { $set: { averageRate } },
        { new: true }
      );

      const populated = await Recipe.findOne({ id: req.params.id })
        .populate({
          path: "reviews",
          populate: {
            path: "userImage",
            select: "picture.image -_id",
          },
        })
        .populate({
          path: "reviews",
          populate: {
            path: "nickname",
            select: "nickname -_id",
          },
        });

      const sendData = {
        averageRate: recipe.averageRate,
        reviews: populated.reviews.map((review) => ({
          ...review._doc,
          nickname: review.nickname.nickname,
          userImage: review?.userImage.picture.image,
        })),
      };
      res.status(200).json(sendData);
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
      await Categorized.create({
        name: req.body.name,
        data: req.body.data,
      });
      res.json("Created Category");
    } catch (error) {
      console.log(error);
    }
  },
};
