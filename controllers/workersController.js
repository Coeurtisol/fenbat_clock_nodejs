import Worker from "../models/Worker.js";

export async function findAll(req, res) {
  console.log(new Date());
  try {
    const workers = await Worker.findAll();
    res.json(workers);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function create(req, res) {
  const worker = req.body;
  try {
    const newWorker = new Worker(worker);
    const data = await newWorker.save();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function deleteOne(req, res) {
  const { id } = req.params;
  try {
    const data = await Worker.delete(Number(id));
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function findAllByDay(req, res) {
  try {
    const { date } = req.params;
    const data = await Worker.findAllByDay(date);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
