const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  userId: { type: String },
  userImage: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  nickname: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  // nickname: { type: String },
  // userImage: { type: String },
  comment: { type: String },
  starRating: { type: Number },
  recipeTitle: { type: String },
  recipeId: { type: Number },
  recipeImage: { type: String },
  displayDate: {
    type: String,
    default: () => {
      const date = new Date();
      const mm = date.getMonth() + 1;
      const dd = date.getDate();
      const yyyy = date.getFullYear();
      return `${mm}/${dd}/${yyyy}`;
    },
  },
  createdAt: {
    type: String,
    default: () => {
      return new Date();
    },
  },
});

const Review = mongoose.model("Review", ReviewSchema);

const RecipeSchema = new mongoose.Schema({
  id: { type: Number },
  recipeTitle: { type: String, required: true },
  data: {},
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
  averageRate: Number,
});

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = { Recipe, Review };
