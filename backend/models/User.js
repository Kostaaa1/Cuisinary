const mongoose = require("mongoose");

const CollectionRecipeSchema = new mongoose.Schema({
  recipeTitle: { type: String },
  recipe: {},
  reviewIndex: { type: Number },
  review: { type: String },
  _id: false,
});

const BirthDate = new mongoose.Schema({
  month: { type: String },
  day: { type: String },
  year: { type: String },
  _id: false,
});

const ImageFile = new mongoose.Schema(
  {
    fileName: {
      type: String,
    },
    image: {
      type: String,
    },
    cloudinaryId: {
      type: String,
    },
    fileType: {
      type: String,
    },
    fileSize: {
      type: String,
    },
  },
  { _id: false, versionKey: false }
);

const PersonalReviews = new mongoose.Schema({
  recipeTitle: { type: String },
  recipeImage: { type: String },
  starRating: { type: Number, required: true },
  comment: { type: String },
  created: { type: Date, default: new Date(Date.now()).toString() },
  _id: false,
});

const CollectionSchema = new mongoose.Schema({
  collName: String,
  collDesc: String,
  private: Boolean,
  uniqueId: { type: Number },
  collRecipes: [CollectionRecipeSchema],
});

const UserSchema = new mongoose.Schema({
  nickname: { type: String, require: true },
  email: { type: String, require: true },
  picture: ImageFile,
  tagline: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  birthDate: BirthDate,
  zipCode: { type: String },
  collections: [CollectionSchema],
  reviews: [PersonalReviews],
});

module.exports = mongoose.model("User", UserSchema);
