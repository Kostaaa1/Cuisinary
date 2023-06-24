const User = require("../models/User");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const cloudinary = require("../middleware/cloudinary");

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];

  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return parseFloat(
    (bytes / Math.pow(1000, index)).toFixed(dm) + "-" + sizes[index]
  );
};

// CRUD OPERATIONS
module.exports = {
  updateUser: async (req, res) => {
    try {
      console.log(req.body);
      const updateData = {};
      Object.entries(req.body.user).forEach(([key, value]) => {
        if (value) updateData[key] = value;
      });
      const user = await User.findOneAndUpdate(
        { email: req.params.email },
        { $set: updateData }
      );
      res.status(200).json(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  updateProfileImage: async (req, res) => {
    try {
      const { path, originalname, mimetype, size } = req.file;
      const { email } = req.params;
      const userImage = await User.findOneAndUpdate({ email: email }, {});

      let { cloudinaryId } = userImage.picture;

      if (cloudinaryId) {
        await cloudinary.uploader.destroy(
          cloudinaryId,
          {
            folder: "user-profile-images",
            transformation: [
              {
                quality: "best",
                width: 140,
                height: 140,
                crop: "scale",
                // quality: 70,
              },
            ],
          },
          () => {
            console.log("Deleted from cloudinary");
          }
        );
      }

      const result = await cloudinary.uploader.upload(path, {
        folder: "user-profile-images",
      });

      console.log(result);

      const user = await User.findOneAndUpdate(
        { email: email },
        {
          $set: {
            picture: {
              fileName: originalname,
              fileType: mimetype,
              fileSize: fileSizeFormatter(size, 2),
              image: result.secure_url,
              cloudinaryId: result.public_id,
            },
          },
        }
      );

      res.status(200).send(user.picture);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  newCollection: async (req, res) => {
    try {
      const { collName, collDesc, private } = req.body;
      const { email } = req.params;

      const user = await User.findOneAndUpdate(
        { email: email },
        {
          $push: {
            collections: {
              $each: [
                {
                  collName: collName,
                  collDesc: collDesc,
                  private: private,
                  collRecipes: [],
                },
              ],
              $position: 1,
            },
          },
        }
      );

      let collection = user.collections.find((x) => x.collName === collName);
      console.log(collection);
      res.status(200).json(collection);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  editCollection: async (req, res) => {
    try {
      if (Object.keys(req.body).length === 0) return;

      const { collName, collDesc, private } = req.body;
      const user = await User.findOneAndUpdate(
        {
          email: req.params.email,
          "collections._id": req.params.id,
        },
        {
          $set: {
            "collections.$.collName": collName,
            "collections.$.collDesc": collDesc,
            "collections.$.private": private,
          },
        }
      );

      res.status(200).json(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  addToCustomCollection: async (req, res) => {
    try {
      const checkedCollections = req.body.collections;
      const recipe = req.body.recipe;

      const update = { $push: {} };
      checkedCollections.forEach((coll) => {
        update.$push[`collections.$.collRecipes`] = recipe;
      });

      await User.findOneAndUpdate(
        { email: req.params.email },
        {
          $push: {
            "collections.$[coll].collRecipes": {
              $each: [
                { recipeTitle: recipe.recipeTitle, recipe: recipe.recipe },
              ],
              $position: 0,
            },
          },
        },

        {
          arrayFilters: [{ "coll.collName": { $in: checkedCollections } }],
        }
      );
      res
        .status(200)
        .json(`Recipe added to ${JSON.stringify(checkedCollections)}`);
    } catch (error) {
      res.status(400).send(error);
    }
  },
  deleteCollection: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        {
          email: req.params.email,
          "collections._id": req.params.id,
        },
        { $pull: { collections: { _id: req.params.id } } }
      );

      res.status(200).send(user);
    } catch (err) {
      res.status(400).send(err);
    }
  },
  createUserReview: async (req, res) => {
    try {
      console.log(req.body);
      const { recipeTitle, recipeId, recipeImage, comment, starRating } =
        req.body;
      const { email } = req.params;
      const user = await User.findOneAndUpdate(
        {
          email: email,
        },
        {
          $push: {
            reviews: {
              recipeTitle,
              recipeImage,
              recipeId,
              comment,
              starRating,
            },
          },
        }
      );

      res.status(200).json(user);
      return user;
    } catch (err) {
      res.status(400).send(err);
    }
  },
  editUserReview: async (req, res) => {
    try {
      const { recipeTitle, recipeImage, comment, starRating } = req.body;
      const { email } = req.params;

      const user = await User.findOneAndUpdate(
        {
          email,
        },
        {
          $set: {
            reviews: {
              recipeTitle,
              recipeImage,
              comment,
              starRating,
            },
          },
        },
        { new: true }
      );
      res.status(200).json(user);
      return user;
    } catch (err) {
      res.status(400).send(err);
    }
  },
  addPersonalRecipe: async (req, res) => {
    try {
      const {
        title,
        summary,
        extendedIngredients,
        directions,
        servings,
        pricePerServing,
        readyInMinutes,
        preparationMinutes,
        private,
        createdBy,
        createdByUserId,
      } = JSON.parse(req.body.form);
      const { path, originalname, mimetype, size } = req.file;
      const { email } = req.params;

      const result = await cloudinary.uploader.upload(path, {
        folder: "user-personal-recipes",
        eager: [
          { fetch_format: "avif", format: "" },
          { fetch_format: "jp2", format: "" },
          { fetch_format: "webp", flags: "awebp", format: "" },
        ],
      });

      const user = await User.findOneAndUpdate(
        { email },
        {
          $push: {
            personalRecipes: {
              title,
              summary,
              extendedIngredients,
              directions,
              servings,
              pricePerServing,
              readyInMinutes,
              preparationMinutes,
              private,
              createdBy,
              createdByUserId,
              picture: {
                fileName: originalname,
                fileType: mimetype,
                fileSize: fileSizeFormatter(size, 2),
                image: result.secure_url,
                cloudinaryId: result.public_id,
              },
            },
          },
        },
        { new: true }
      );

      console.log(user);
      res.status(201).json("Created New Recipe");
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getPersonalRecipe: async (req, res) => {
    try {
      const { userId, id } = req.params;
      const user = await User.findById(userId);

      const personalRecipe = user.personalRecipes.find(
        (recipe) => recipe._id.toString() === id
      );

      res.status(200).json(personalRecipe);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  deletePersonalRecipe: async (req, res) => {
    try {
      const { id, email } = req.params;
      const user = await User.findOne({ email });

      const findRecipe = user.personalRecipes.find(
        (recipe) => recipe._id.toString() === id
      );

      await cloudinary.uploader.destroy(
        findRecipe.picture.cloudinaryId,
        { folder: "user-profile-images" },
        () => {
          console.log("Deleted from cloudinary");
        }
      );

      await user.updateOne({ $pull: { personalRecipes: { _id: id } } });

      res.status(200).json(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};
