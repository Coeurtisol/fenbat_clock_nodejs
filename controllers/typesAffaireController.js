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
  const data = req.body;
  try {
    const typeAffaire = new TypeAffaire(data);
    await typeAffaire.save();
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
    const typeAffaire = new TypeAffaire({ id, ...data });
    await typeAffaire.update();
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function deleteOne(req, res) {
  const id = Number(req.params.id);
  try {
    await TypeAffaire.delete(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
