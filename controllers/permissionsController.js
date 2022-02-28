import Permission from "../models/Permission.js";

export async function getAll(req, res) {
  try {
    let data;
    data = await Permission.getAll();
    res.json(data);
  } catch (error) {
    // console.log(error);
    res.status(500).end();
  }
}
