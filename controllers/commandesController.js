import Commande from "../models/Commande.js";

export async function getAll(req, res) {
  try {
    const commandes = await Commande.findAll();
    res.json(commandes);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function getAllByUser(req, res) {
  const userId = Number(req.params.userId);
  try {
    const commandes = await Commande.findAllByUser(userId);
    res.json(commandes);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function create(req, res) {
  const commande = req.body;
  try {
    const newCommande = new Commande(commande);
    const data = await newCommande.save();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function valider(req, res) {
  const id = Number(req.params.id);
  const commande = req.body;
  try {
    const data = await Commande.valider(id, commande);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function deleteOne(req, res) {
  const id = Number(req.params.id);
  try {
    const data = await Commande.delete(id);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function getNumberCommandesEnAttente(req, res) {
  try {
    const data = await Commande.getCountEnAttente();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}