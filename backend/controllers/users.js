const User = require("../models/User");
const cloudinary = require("../middleware/cloudinary");
const { default: mongoose } = require("mongoose");

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
        await cloudinary.uploader.destroy(cloudinaryId, () => {
          console.log("Deleted from cloudinary");
        });
      }

      const result = await cloudinary.uploader.upload(path, {
        folder: "user-profile-images",
        transformation: [
          {
            width: 350,
            height: 350,
            crop: "fill",
            format: "jpg",
            fetch_format: "jpg",
          },
        ],
      });

      console.log("RESULT", result);

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
        },
        { new: true }
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
  addToCustomCollection: async (req, res) => {
    try {
      const checkedCollections = req.body.collectionIds;
      const recipeId = req.body.recipeId;

      const collectionIds = checkedCollections.map(
        (collId) => new mongoose.Types.ObjectId(collId)
      );

      await User.findOneAndUpdate(
        { email: req.params.email },
        {
          $push: {
            "collections.$[coll].collRecipes": {
              $each: [recipeId],
              $position: 0,
            },
          },
        },
        {
          arrayFilters: [{ "coll._id": { $in: collectionIds } }],
        }
      );

      res
        .status(200)
        .json(`Recipe added to ${JSON.stringify(checkedCollections)}`);
    } catch (error) {
      res.status(400).send(error);
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
        transformation: {
          crop: "fill",
          format: "jpg",
          fetch_format: "jpg",
          width: 880,
          height: 880,
        },
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
              $position: 0,
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
