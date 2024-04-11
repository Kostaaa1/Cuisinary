const axios = require("axios");
const { Recipe } = require("../models/Recipe");
const User = require("../models/User");

const addRecipeToSavedCollection = async (email, data, res) => {
  try {
    const filter = {
      email,
      "collections.collName": "All Saved Items",
    };

    const update = {
      $push: {
        "collections.$.collRecipes": {
          $each: [data._id],
          $position: 0,
        },
      },
    };

    const options = {
      unique: true,
      new: true,
      runValidators: true,
    };

    const user = await User.findOne({ email });
    const checkRecipeSaved = user.collections[0].collRecipes.includes(data._id);

    if (checkRecipeSaved) {
      res.status(200).send(null);
      return;
    }

    await User.findOneAndUpdate(filter, update, options);
    const populatedUser = await User.findOne({ email }).populate(
      "collections.collRecipes"
    );
    res.status(200).json(populatedUser.collections[0].collRecipes);
  } catch (error) {
    res.status(404).json(error.message);
  }
};

module.exports = {
  addToFavorite: async (req, res) => {
    try {
      const { email } = req.params;
      const { id } = req.body;
      const existingRecipe = await Recipe.findOne({ id });

      if (!existingRecipe) {
        const recipe = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.SPOONACULAR_API_KEY}&includeNutrition=true`
        );

        const recipeData = {
          recipeTitle: recipe.data.title,
          id: recipe.data.id,
          averageRate: "",
          data: recipe.data,
        };

        const createdRecipe = await Recipe.create(recipeData);
        await addRecipeToSavedCollection(email, createdRecipe, res);
      } else {
        await addRecipeToSavedCollection(email, existingRecipe, res);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  addUser: async (req, res) => {
    try {
      const { name, email, nickname } = req.body.user;
      const user = await User.findOne({ email: req.params.email });

      const updatedUser = await User.findOne({ email })
        .populate("collections.collRecipes")
        .populate("reviews");

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

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(404).send(error.message);
    }
  },
  getUserId: async (req, res) => {
    try {
      const user = await User.findOne({ _id: req.params.id })
        .populate("collections.collRecipes")
        .populate("reviews");

      res.status(200).json(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  deleteFavorite: async (req, res) => {
    try {
      console.log(req.body);

      const { email } = req.params;
      let filter = {
        email,
        "collections.collName": "All Saved Items",
      };
      if (req.body.collectionId !== "") {
        filter = {
          email,
          "collections._id": req.body.collectionId,
        };
      }

      const user = await User.findOneAndUpdate(
        filter,
        {
          $pull: {
            "collections.$.collRecipes": { $in: req.body.ids },
          },
        },
        { new: true }
      );

      console.log(user.collections);
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
