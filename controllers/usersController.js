import User from "../models/User.js";
import bcrypt from "bcrypt";

export async function create(req, res) {
  const user = req.body;
  user.roleId = Number(user.roleId);
  user.entiteId = Number(user.entiteId) == 0 ? null : Number(user.entiteId);
  // console.log(user);
  try {
    console.log(user);
    user.password = await bcrypt.hash(user.password, 10);
    user.accessCode = await bcrypt.hash(user.accessCode, 10);
    const newUser = new User(user);
    const data = await newUser.save();
    // console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function update(req, res) {
  const id = Number(req.params.id);
  const user = req.body;
  if (user.roleId) {
    user.roleId = Number(user.roleId);
  }
  user.entiteId = Number(user.entiteId) == 0 ? null : Number(user.entiteId);
  if (user.accessCode) {
    user.accessCode = await bcrypt.hash(user.accessCode, 10);
  }
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  try {
    const data = await User.update(id, user);
    // console.log(data);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function findOne(req, res) {
  const id = Number(req.params.id);
  try {
    const user = await User.findById(id);
    // console.log(user);
    res.json(user);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function findAll(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function deleteOne(req, res) {
  const { id } = req.params;
  try {
    const data = await User.delete(Number(id));
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function findAllByDay(req, res) {
  try {
    const { date } = req.params;
    const data = await User.findAllByDay(date);
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

export async function addAdmin(req, res) {
  const admin = {
    firstname: "admin",
    lastname: "admin",
    roleId: 1,
    entiteId: null,
    accessCode: "1234",
  };
  try {
    admin.accessCode = await bcrypt.hash(admin.accessCode, 10);
    const newUser = new User(admin);
    const data = await newUser.save();
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}
