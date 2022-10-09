// import path from "path";
// import fsPromise from "fs/promises";
import Semaine from "../models/Semaine.js";
import { updatePointages } from "../controllers/pointagesController.js";
import pdfGenerate from "../tools/pdfGenerator.js";

export async function getAllByWeek(req, res) {
  const annee = +req.params.year;
  const numero = +req.params.week;
  try {
    const data = await Semaine.getAllByWeek(annee, numero);
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
    let foundSemaine;
    foundSemaine = await Semaine.findOne(annee, numero, userId);
    if (!foundSemaine) {
      const newSemaine = new Semaine(annee, numero, userId);
      foundSemaine = await newSemaine.save();
    }
    res.json(foundSemaine);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function update(req, res) {
  const id = Number(req.params.id);
  const { semaine } = req.body;
  const user = res.locals.user;
  const PDFversion =
    user.id === semaine.user.id ? "PDFemploye" : "PDFresponsable";
  try {
    await updatePointages(semaine.pointages);
    const data = await Semaine.update(id, semaine);
    await pdfGenerate(data, PDFversion , user);
    await Semaine.update(id, {
      ...semaine,
      [PDFversion]: "1",
    });
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function getNumberSemainesEnAttente(req, res) {
  const numero = Number(req.params.numeroSemaine);
  const permissionId = res.locals.user.role.permissionId;
  const etatSemaineId = permissionId === 1 ? 3 : 2;
  try {
    const data = await Semaine.getCountEnAttente(numero, etatSemaineId);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

// export async function getPDF(req, res) {
//   const { prenomNom, annee, semaine, version } = req.params;
//   const fileName = `${prenomNom}-${annee}-${semaine}-${version}.pdf`;

//   try {
//     const stats = await fsPromise.stat("./documents/pdf/" + fileName);
//     if (!stats) {
//       res.status(404).end("Fichier introuvable");
//       return;
//     }
//     res.sendFile(path.resolve() + "/documents/pdf/" + fileName);
//   } catch (err) {
//     // console.log(err);
//     res.status(500).end();
//   }
// }
