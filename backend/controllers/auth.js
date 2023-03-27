const User = require("../models/User");

module.exports = {
  addUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        const newUser = new User(req.body.user);
        await newUser.save();

        res.status(200).json(newUser);
      }
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.params.email });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).send(error.message);
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
  validateUser: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.params.email });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  addToFavorite: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        {
          email: req.params.email,
          "collections.collName": "All Saved Items",
        },
        {
          $push: {
            "collections.$.collRecipes": {
              $each: [
                {
                  recipeTitle: req.body.recipeTitle,
                  recipe: req.body.recipe,
                  review: req.body.review,
                  reviewIndex: req.body.reviewIndex,
                },
              ],
              $position: 0,
            },
          },
        },
        { unique: true, new: true, runValidators: true }
      );

      res.status(200).json(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  deleteFavorite: async (req, res) => {
    console.log(req.body);
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

      const user = await User.findOneAndUpdate(filter, {
        $pull: {
          "collections.$.collRecipes": {
            recipeTitle: { $in: req.body.titles },
          },
        },
      });

      res.status(200).json(user);
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
