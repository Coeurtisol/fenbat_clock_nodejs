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
  const data = req.body;
  try {
    const affaire = new Affaire(data);
    await affaire.calculZone();
    await affaire.save();
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
    const affaire = new Affaire({ id, ...data });
    await affaire.calculZone();
    await affaire.update();
    res.status(204).end();
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
