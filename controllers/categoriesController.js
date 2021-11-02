import Category from "../models/Category.js";

export async function findAll(req, res) {
  try {
    const categories = await User.findAll();
    res.json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function create(req, res) {
  const category = req.body;
  try {
    const newCategory = new Category(category);
    const data = await newCategory.save();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function update(req, res) {
  const id = Number(req.params.id);
  const { updatedCategory } = req.body;
  try {
    const data = await Category.update({ id, updatedCategory });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function deleteOne(req, res) {
  const id = Number(req.params.id);
  try {
    const data = await Category.delete(id);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}