const mongoose = require("mongoose");

const RecipeSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  recipeTitle: { type: String },
  data: {},
  nutritions: {},
  reviews: [
    {
      userId: { type: String },
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
    },
  ],
});

module.exports = mongoose.model("Recipe", RecipeSchema);
