import DonneurAffaire from "../models/DonneurAffaire.js";

export async function getAll(req, res) {
  try {
    const donneursAffaire = await DonneurAffaire.findAll();
    res.json(donneursAffaire);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function create(req, res) {
  const donneurAffaire = req.body;
  try {
    const newDonneurAffaire = new DonneurAffaire(donneurAffaire);
    const data = await newDonneurAffaire.save();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function update(req, res) {
  const id = Number(req.params.id);
  const updatedDonneurAffaire = req.body;
  try {
    const data = await DonneurAffaire.update(id, updatedDonneurAffaire );
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function deleteOne(req, res) {
  const id = Number(req.params.id);
  try {
    const data = await DonneurAffaire.delete(id);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}