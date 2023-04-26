const mongoose = require("mongoose");

const CategorizedSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  data: {},
});

module.exports = mongoose.model("Category", CategorizedSchema);
