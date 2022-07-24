import Categorie from "../models/Categorie.js";

export async function getAll(req, res) {
  try {
    const categories = await Categorie.findAll();
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function create(req, res) {
  const categorie = req.body;
  try {
    const newCategorie = new Categorie(categorie);
    const data = await newCategorie.save();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function update(req, res) {
  const id = Number(req.params.id);
  const categorie = req.body;
  try {
    const data = await Categorie.update(id, categorie);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function deleteOne(req, res) {
  const id = Number(req.params.id);
  try {
    const data = await Categorie.delete(id);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}