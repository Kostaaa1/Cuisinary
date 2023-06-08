const mongoose = require("mongoose");

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

const PersonalRecipe = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String },
  extendedIngredients: [{ value: String, placeholder: String, id: String }],
  directions: [{ value: String, placeholder: String, id: String }],
  servings: { type: String },
  pricePerServing: { type: String },
  readyInMinutes: { type: String },
  preparationMinutes: { type: String },
  picture: ImageFile,
  private: { type: Boolean },
});

const PersonalReviews = new mongoose.Schema(
  {
    recipeTitle: { type: String },
    recipeId: { type: Number, required: true },
    recipeImage: { type: String },
    starRating: { type: Number, required: true },
    comment: { type: String, trim: true },
  },
  { timestamps: true }
);

const CollectionRecipeSchema = new mongoose.Schema({
  recipeTitle: { type: String, required: true },
  recipe: {
    id: { type: Number },
    image: { type: String },
    imageType: { type: String },
    summary: { type: String },
  },
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
  nickname: { type: String, required: true },
  email: { type: String, required: true },
  picture: ImageFile,
  tagline: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  birthDate: BirthDate,
  zipCode: { type: String },
  collections: [CollectionSchema],
  reviews: [PersonalReviews],
  personalRecipes: [PersonalRecipe],
});

module.exports = mongoose.model("User", UserSchema);
