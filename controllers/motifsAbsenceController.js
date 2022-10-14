import MotifAbsence from "../models/MotifAbsence.js";

export async function getAll(req, res) {
  try {
    const motifsAbsence = await MotifAbsence.findAll();
    res.json(motifsAbsence);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function create(req, res) {
  const data = req.body;
  try {
    const motifAbsence = new MotifAbsence(data);
    await motifAbsence.save();
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
    const motifAbsence = new MotifAbsence({...data,id})
    await motifAbsence.update();
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function deleteOne(req, res) {
  const id = Number(req.params.id);
  try {
    await MotifAbsence.delete(id);
    res.status(204).end();
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
