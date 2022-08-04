import ClientAffaire from "../models/ClientAffaire.js";

export async function getAll(req, res) {
  try {
    const clientsAffaire = await ClientAffaire.findAll();
    res.json(clientsAffaire);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function create(req, res) {
  const data = req.body;
  try {
    const clientAffaire = new ClientAffaire(data);
    await clientAffaire.save();
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
    const clientAffaire = new ClientAffaire({id, ...data});
    await clientAffaire.update();
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function deleteOne(req, res) {
  const id = Number(req.params.id);
  try {
    await ClientAffaire.delete(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}