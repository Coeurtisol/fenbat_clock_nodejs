import Article from "../models/Article.js";

export async function getAll(req, res) {
  try {
    const articles = await Article.findAll();
    res.json(articles);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function create(req, res) {
  const article = req.body;
  try {
    const newArticle = new Article(article);
    const data = await newArticle.save();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function update(req, res) {
  const id = Number(req.params.id);
  const updatedArticle = req.body;
  updatedArticle.categorieId = Number(updatedArticle.categorieId) || null;
  try {
    const data = await Article.update(id, updatedArticle);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function deleteOne(req, res) {
  const id = Number(req.params.id);
  try {
    const data = await Article.delete(id);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
