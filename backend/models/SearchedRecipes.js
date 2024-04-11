const mongoose = require("mongoose");

const SearchedRecipeSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  data: {},
});

module.exports = mongoose.model("Search", SearchedRecipeSchema);
