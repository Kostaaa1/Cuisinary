const axios = require("axios");
const { Recipe } = require("../models/Recipe");
const User = require("../models/User");

const addRecipeToSavedCollection = async (email, data) => {
  try {
    console.log(data, "this is data");
    const filter = {
      email,
      "collections.collName": "All Saved Items",
    };
    const update = {
      $push: {
        "collections.$.collRecipes": {
          $each: [{ recipeTitle: data.recipeTitle, recipe: data.recipe }],
          $position: 0,
        },
      },
    };
    const options = { unique: true, new: true, runValidators: true };
    const user = await User.findOneAndUpdate(filter, update, options);
    return user.collections[0];
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = {
  addToFavorite: async (req, res) => {
    try {
      const { email } = req.params;
      const existingRecipe = await Recipe.findOne({ id: req.body.id });
      let newRecipeData;

      if (!existingRecipe) {
        // const {
        //   data: { title, id, imageType, image, summary },
        // } = await axios.get(
        //   `https://api.spoonacular.com/recipes/${req.body.id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}&includeNutrition=true`
        // );
        const recipe = await axios.get(
          `https://api.spoonacular.com/recipes/${req.body.id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}&includeNutrition=true`
        );
        const { title, id, imageType, image, summary } = recipe.data;

        newRecipeData = {
          recipeTitle: title,
          recipe: {
            id: id,
            imageType: imageType,
            image: image,
            summary: summary,
          },
        };

        Recipe.create({
          id,
          recipeTitle: title,
          data: recipe.data,
        });
      } else {
        newRecipeData = {
          recipeTitle: existingRecipe.data.title,
          recipe: {
            id: existingRecipe.data.id,
            imageType: existingRecipe.data.imageType,
            image: existingRecipe.data.image,
            summary: existingRecipe.data.summary,
          },
        };
      }

      const collection = await addRecipeToSavedCollection(email, newRecipeData);
      res.status(200).json(collection);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  addUser: async (req, res) => {
    try {
      const { name, email, nickname } = req.body.user;
      let user = await User.findOne({ email: req.params.email });

      if (!user) {
        const newUser = new User({
          name: name,
          email: email,
          nickname: nickname,
          firstName: "",
          lastName: "",
          birthDate: { month: "", day: "", year: "" },
          zipCode: "",
          tagline: "",
          picture: {
            fileName: "",
            fileType: "",
            fileSize: "",
            image: "",
            cloudinaryId: "",
          },
          collections: [
            {
              collName: "All Saved Items",
              collDesc: "",
              private: false,
              collRecipes: [],
            },
          ],
        });
        await newUser.save();
        res.status(201).json(newUser);
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(404).send(error.message);
    }
  },
  getUserId: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  deleteFavorite: async (req, res) => {
    try {
      let filter = {
        email: req.params.email,
        "collections.collName": "All Saved Items",
      };
      if (req.body.collectionId !== "") {
        filter = {
          email: req.params.email,
          "collections._id": req.body.collectionId,
        };
      }

      const user = await User.findOneAndUpdate(
        filter,
        {
          $pull: {
            "collections.$.collRecipes": {
              recipeTitle: { $in: req.body.titles },
            },
          },
        },
        { new: true }
      );

      res.status(200).json(user.collections);
    } catch (error) {
      res.status(400).send(error.message);
      console.log(error);
    }
  },
  getCustomCollection: async (req, res) => {
    try {
      const user = await User.findOne(
        {
          email: req.params.email,
          "collections._id": req.params.id,
        },
        {
          "collections.$": 1,
        }
      );

      res.status(200).json(user.collections[0]);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  getSavedCollection: async (req, res) => {
    try {
      const user = await User.findOne(
        {
          email: req.params.email,
          "collections.collName": "All Saved Items",
        },
        {
          "collections.$": 1,
        }
      );

      res.status(200).send(user.collections[0]);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};
