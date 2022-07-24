import Entite from "../models/Entite.js";

export async function getAll(req, res) {
  try {
    const entites = await Entite.findAll();
    res.json(entites);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function create(req, res) {
  const entite = req.body;
  try {
    const newEntite = new Entite(entite);
    const data = await newEntite.save();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function update(req, res) {
  const id = Number(req.params.id);
  const  updatedEntite = req.body;
  try {
    const data = await Entite.update( id, updatedEntite );
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function deleteOne(req, res) {
  const id = Number(req.params.id);
  try {
    const data = await Entite.delete(id);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}