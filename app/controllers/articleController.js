import ArticleModel from "../models/Article";

exports.getArticles = async function (req, res) {
  try {
    const articles = await ArticleModel.find({});
    return res.status(200).json({
      status: 200,
      data: articles,
      message: "Succesfully Retrieved articles",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.addArticle = async function (req, res) {
  const {
    req: {
      body: { categories, tags, title, resume, picture },
    },
  } = req;
  try {
    await ArticleModel.create({ categories, tags, title, resume, picture });

    return res
      .status(200)
      .json({ status: 200, message: "Succesfully Created" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.deleteArticle = async function (req, res) {
  try {
    const article = await ArticleModel.findById(req.params.id);
    await ArticleModel.remove(req.params.id);
    return res
      .status(200)
      .json({ status: 200, data: article, message: "Succesfully deleted" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
