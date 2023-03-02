const User = require("../models/User");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
const SingleFile = require("../models/singlefile");
const cloudinary = require("../middleware/cloudinary");
const autoIncrement = require("mongoose-auto-increment");

const fileSizeFormatter = (bytes, decimal) => {
  if (bytes === 0) {
    return "0 Bytes";
  }
  const dm = decimal || 2;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];

  const index = Math.floor(Math.log(bytes) / Math.log(1000));
  return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm) + "-" + sizes[index]);
};

// CRUD OPERATIONS
module.exports = {
  updateUser: async (req, res) => {
    try {
      const updateData = {};
      Object.entries(req.body.user).forEach(([key, value]) => {
        if (value) updateData[key] = value;
      });
      const user = await User.findOneAndUpdate({ email: req.params.email }, { $set: updateData });
      res.status(200).json(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  updateProfileImage: async (req, res) => {
    try {
      const userImage = await User.findOneAndUpdate({ email: req.params.email }, {});

      let { cloudinaryId } = userImage.picture;

      if (cloudinaryId) {
        await cloudinary.uploader.destroy(cloudinaryId, (res) => {
          console.log(res);
        });
      }

      const result = await cloudinary.uploader.upload(req.file.path);
      const user = await User.findOneAndUpdate(
        { email: req.params.email },
        {
          $set: {
            picture: {
              fileName: req.file.originalname,
              fileType: req.file.mimetype,
              fileSize: fileSizeFormatter(req.file.size, 2),
              image: result.secure_url,
              cloudinaryId: result.public_id,
            },
          },
        }
      );

      res.status(200).send(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  newCollection: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { email: req.params.email },
        {
          $push: {
            collections: {
              $each: [
                {
                  collName: req.body.collName,
                  collDesc: req.body.collDesc,
                  private: req.body.private,
                  collRecipes: [],
                },
              ],
              $position: 1,
            },
          },
        }
      );

      res.status(200).json(user);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
  editCollection: async (req, res) => {
    try {
      console.log(req.body);
      if (Object.keys(req.body).length === 0) return;

      const user = await User.findOneAndUpdate(
        {
          email: req.params.email,
          "collections._id": req.params.id,
        },
        {
          $set: {
            "collections.$.collName": req.body.collName,
            "collections.$.collDesc": req.body.collDesc,
            "collections.$.private": req.body.private,
          },
        }
      );

      console.log("Collection updated");
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

      const user = await User.findOneAndUpdate(
        { email: req.params.email },
        {
          $push: {
            "collections.$[coll].collRecipes": {
              $each: [{ recipeTitle: recipe.recipeTitle, recipe: recipe.recipe }],
              $position: 0,
            },
          },
        },

        {
          arrayFilters: [{ "coll.collName": { $in: checkedCollections } }],
        }
      );
      res.status(200).json(`Recipe added to ${JSON.stringify(checkedCollections)}`);
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
};
