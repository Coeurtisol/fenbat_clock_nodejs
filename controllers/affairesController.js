import Affaire from "../models/Affaire.js";

export async function getAll(req, res) {
  try {
    const affaires = await Affaire.findAll();
    res.json(affaires);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function create(req, res) {
  const affaire = req.body;
  try {
    const newAffaire = new Affaire(affaire);
    const data = await newAffaire.save();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function update(req, res) {
  const id = Number(req.params.id);
  const updatedAffaire = req.body;
  updatedAffaire.entiteId = Number(updatedAffaire.entiteId);
  updatedAffaire.secteurAffaireId = Number(updatedAffaire.secteurAffaireId);
  updatedAffaire.typeAffaireId = Number(updatedAffaire.typeAffaireId);
  updatedAffaire.clientAffaireId = Number(updatedAffaire.clientAffaireId);
  updatedAffaire.donneurAffaireId = Number(updatedAffaire.donneurAffaireId);
  try {
    const data = await Affaire.update(id, updatedAffaire);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function deleteOne(req, res) {
  const id = Number(req.params.id);
  try {
    const data = await Affaire.delete(id);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
