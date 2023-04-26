const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  userId: { type: String },
  userImage: { type: String },
  nickname: { type: String },
  comment: { type: String },
  starRating: { type: Number },
  createdAt: {
    type: String,
    default: () => {
      const date = new Date();
      const mm = date.getMonth() + 1;
      const dd = date.getDate();
      const yyyy = date.getFullYear();
      return `${mm}/${dd}/${yyyy}`;
    },
  },
});

const Review = mongoose.model("Review", ReviewSchema);

const RecipeSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  recipeTitle: { type: String, required: true },
  data: {},
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

const Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = { Recipe, Review };
