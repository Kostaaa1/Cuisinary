const Articles = require("../models/Articles");

module.exports = {
  getArticles: async (req, res) => {
    try {
      const articles = await Articles.find();

      // create article:
      // const response = await axios.get(
      //   `https://newsapi.org/v2/everything?q=recipes&pageSize=50&apiKey=${process.env.NEWS_API_KEY}`
      // );
      // const articles = response.data.articles;
      // const newArticles = new Articles({ articles });
      // let yo = await newArticles.save();

      res.status(200).json(articles[0]);
    } catch (error) {
      res.status(400).json(error.message);
    }
  },
};
