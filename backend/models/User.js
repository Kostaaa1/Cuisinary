const mongoose = require("mongoose");

const BirthDateSchema = new mongoose.Schema({
  month: String,
  day: String,
  year: String,
  _id: false,
});

const ImageFileSchema = new mongoose.Schema(
  {
    fileName: String,
    image: String,
    cloudinaryId: String,
    fileType: String,
    fileSize: String,
  },
  { _id: false, versionKey: false }
);

const PersonalRecipeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: String,
  extendedIngredients: [{ value: String, placeholder: String, id: String }],
  directions: [{ value: String, placeholder: String, id: String }],
  servings: String,
  pricePerServing: String,
  readyInMinutes: String,
  preparationMinutes: String,
  picture: ImageFileSchema,
  createdBy: String,
  createdByUserId: { type: String, required: true },
  private: Boolean,
});

const PersonalReviewSchema = new mongoose.Schema(
  {
    recipeTitle: String,
    recipeId: { type: Number, required: true },
    recipeImage: String,
    starRating: { type: Number, required: true },
    comment: { type: String, trim: true },
  },
  { timestamps: true }
);

const CollectionRecipeSchema = new mongoose.Schema({
  recipeTitle: { type: String, required: true },
  recipe: {
    id: Number,
    image: String,
    imageType: String,
    summary: String,
  },
  _id: false,
});

const CollectionSchema = new mongoose.Schema({
  collName: String,
  collDesc: String,
  private: Boolean,
  id: Number,
  collRecipes: [CollectionRecipeSchema],
});

const UserSchema = new mongoose.Schema({
  nickname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  picture: ImageFileSchema,
  tagline: String,
  firstName: String,
  lastName: String,
  birthDate: BirthDateSchema,
  zipCode: String,
  collections: [CollectionSchema],
  reviews: [PersonalReviewSchema],
  personalRecipes: [PersonalRecipeSchema],
});

module.exports = mongoose.model("User", UserSchema);
