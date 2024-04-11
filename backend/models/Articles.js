const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema({
  articles: [
    {
      source: {
        id: { type: String },
        name: { type: String, required: true },
      },
      author: { type: String },
      title: { type: String, required: true },
      description: { type: String },
      url: { type: String, required: true },
      urlToImage: { type: String },
      publishedAt: { type: Date, required: true },
      content: { type: String },
    },
  ],
});

module.exports = mongoose.model("Article", ArticleSchema);
