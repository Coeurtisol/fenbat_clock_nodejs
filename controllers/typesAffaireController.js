import TypeAffaire from "../models/TypeAffaire.js";

export async function getAll(req, res) {
  try {
    const typesAffaire = await TypeAffaire.findAll();
    res.json(typesAffaire);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function create(req, res) {
  const typeAffaire = req.body;
  try {
    const newTypeAffaire = new TypeAffaire(typeAffaire);
    const data = await newTypeAffaire.save();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function update(req, res) {
  const id = Number(req.params.id);
  const updatedTypeAffaire = req.body;
  try {
    const data = await TypeAffaire.update(id, updatedTypeAffaire);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function deleteOne(req, res) {
  const id = Number(req.params.id);
  try {
    const data = await TypeAffaire.delete(id);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
