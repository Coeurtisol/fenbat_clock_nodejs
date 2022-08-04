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
  const data = req.body;
  console.log(data);
  try {
    const article = new Article(data);
    await article.save();
    res.status(201).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function update(req, res) {
  const id = Number(req.params.id);
  const data = req.body;
  console.log(data);
  try {
    const article = new Article({ id, ...data });
    await article.update();
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function deleteOne(req, res) {
  const id = Number(req.params.id);
  try {
    await Article.delete(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
