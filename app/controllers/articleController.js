import ArticleModel from "../models/Article";
import resMsg from "../controllers/ErrorsPage.js";

export async function getArticles(req, res) {
  try {
    const { cat, limit } = req.params;
    const numOfArticles = limit ? limit : 15;
    const query = cat ? { categorie: cat } : {};

    const articles = await ArticleModel.find(query).limit(numOfArticles);

    return res.status(200).json({
      status: 200,
      data: articles,
      message: `Succesfully Retrieved articles for category: ${cat}`,
    });
  } catch (e) {
    return res.status(500).json(resMsg.errorIntern);
  }
}

export async function addArticle(req, res) {
  try {
    const {
      body: { categorie, tags, title, resume, picture },
    } = req;

    await ArticleModel.create({ categorie, tags, title, resume, picture });

    return res
      .status(200)
      .json({ status: 201, message: "Succesfully Created" });
  } catch (e) {
    return res.status(500).json(resMsg.errorIntern);
  }
}

export async function deleteArticle(req, res) {
  try {
    const article = await ArticleModel.findById(req.params.id);
    if (!article) {
      return res
        .status(404)
        .json({ status: 404, message: "there is no article with this id" });
    }
    await ArticleModel.deleteOne({ _id: req.params.id });
    return res
      .status(200)
      .json({ status: 200, data: article, message: "Succesfully deleted" });
  } catch (e) {
    return res.status(500).json(resMsg.errorIntern);
  }
}