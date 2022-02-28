import ClientAffaire from "../models/ClientAffaire.js";

export async function getAll(req, res) {
  try {
    const clientsAffaire = await ClientAffaire.findAll();
    res.json(clientsAffaire);
  } catch (error) {
    // console.log(error);
    res.status(500).end();
  }
}

export async function create(req, res) {
  const clientAffaire = req.body;
  try {
    const newClientAffaire = new ClientAffaire(clientAffaire);
    const data = await newClientAffaire.save();
    res.json(data);
  } catch (error) {
    // console.log(error);
    res.status(500).end();
  }
}

export async function update(req, res) {
  const id = Number(req.params.id);
  const updatedClientAffaire = req.body;
  try {
    const data = await ClientAffaire.update(id, updatedClientAffaire );
    res.json(data);
  } catch (error) {
    // console.log(error);
    res.status(500).end();
  }
}

export async function deleteOne(req, res) {
  const id = Number(req.params.id);
  try {
    const data = await ClientAffaire.delete(id);
    res.json(data);
  } catch (error) {
    // console.log(error);
    res.status(500).end();
  }
}