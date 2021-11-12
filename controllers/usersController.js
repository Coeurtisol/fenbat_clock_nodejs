import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwtPKG from "jsonwebtoken";
const Jwt = jwtPKG;

export async function create(req, res) {
  const user = req.body;
  user.roleId = Number(user.roleId);
  user.entiteId = Number(user.entiteId) == 0 ? null : Number(user.entiteId);
  // console.log(user);
  try {
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
  user.roleId = Number(user.roleId);
  user.entiteId = Number(user.entiteId) == 0 ? null : Number(user.entiteId);
  if (user.accessCode) {
    user.accessCode = await bcrypt.hash(user.accessCode, 10);
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

export async function login(req, res) {
  const { id, password } = req.body;
  console.log(id, password);

  const user = await User.login(id);
  if (!user) {
    return res.status(403).end("Utilisateur introuvable");
  }

  if (!user.status) {
    return res.status(403).end("Compte désactivé");
  }

  const correctPassword = await bcrypt.compare(password, user.accessCode);
  if (!correctPassword) {
    return res.status(403).end("Code d'accès erroné");
  }

  const payload = {
    id,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
    entite: user.entite,
  };
  const secretKey = process.env.KEY;
  const options = { expiresIn: 60 * 60 }; // 60 minutes
  const token = Jwt.sign(payload, secretKey, options);
  // const token = Jwt.sign(payload, secretKey);
  res.send(token);
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
