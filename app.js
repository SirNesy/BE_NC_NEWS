const express = require("express");

const {
  getTopics,
  getArticles,
  getArticleById,
  getCommentsById,
} = require("./controller/news.controller");
const app = express();

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getCommentsById);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "invalid URL!" });
});
app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "Server error!" });
});

module.exports = app;
