import fsPromise from "fs/promises";
import Semaine from "../models/Semaine.js";
import {
  createPointages,
  updatePointages,
} from "../controllers/pointagesController.js";
import pdfGenerate from "../pdfGenerator.js";

export async function getAllByWeek(req, res) {
  const annee = +req.params.year;
  const numero = +req.params.week;
  try {
    let data;
    data = await Semaine.getAllByWeek(annee, numero);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function findOne(req, res) {
  const annee = +req.params.year;
  const numero = +req.params.week;
  const userId = +req.params.userId;
  try {
    let data;
    data = await Semaine.findOne(annee, numero, userId);
    if (!data) {
      const newSemaine = new Semaine(annee, numero, userId);
      const pointages = createPointages(numero, userId);
      newSemaine.pointages = pointages;
      data = await newSemaine.save();
    }
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function create(req, res) {
  const semaine = req.body;
  try {
    const newSemaine = new Semaine(semaine);
    const data = await newSemaine.save();
    console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function update(req, res) {
  const id = Number(req.params.id);
  const updatedSemaine = req.body;
  try {
    updatePointages(updatedSemaine.pointages); //enregistre séparement les pointages, pb en remplçant l'array entier
    const data = await Semaine.update(id, updatedSemaine);
    await pdfGenerate(data);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function getPDF(req, res) {
  const username = req.params.firstname + req.params.lastname;
  const annee = req.params.firstname;
  const semaine = req.params.semaine;
  const fileName = `${username}-${annee}-${semaine}.pdf`;

  try {
    const stats = await fsPromise.stat("./documents/pdf/" + fileName);
    if (!stats) {
      res.status(404).end("Fichier introuvable");
      return;
    }
    res.sendFile(__dirname + "/files/" + file);
  } catch (err) {
    console.log(err);
    res.status(500).end();
  } 
}
