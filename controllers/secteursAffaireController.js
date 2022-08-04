import SecteurAffaire from "../models/SecteurAffaire.js";

export async function getAll(req, res) {
  try {
    const secteursAffaire = await SecteurAffaire.findAll();
    res.json(secteursAffaire);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function create(req, res) {
  const data = req.body;
  try {
    const secteurAffaire = new SecteurAffaire(data);
    await secteurAffaire.save();
    res.status(201).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function update(req, res) {
  const id = Number(req.params.id);
  const data = req.body;
  try {
    const secteurAffaire = new SecteurAffaire({id,...data});
    await secteurAffaire.update();
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function deleteOne(req, res) {
  const id = Number(req.params.id);
  try {
    await SecteurAffaire.delete(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}