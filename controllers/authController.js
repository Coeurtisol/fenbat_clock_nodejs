import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwtPKG from "jsonwebtoken";
const Jwt = jwtPKG;

function compareIp(req) {
  const secureIP = process.env.SECURE_IP;
  const ip = req.socket.remoteAddress;
  return ip == secureIP;
}

export function isSecure(req, res) {
  let isSecure = true;
  if (Number(process.env.VERIFY_IP)) {
    isSecure = compareIp(req);
  }
  return res.status(200).json({ isSecure });
}

export async function getActiveUsersList(req, res) {
  try {
    const users = await User.findAllActive();
    res.json(users);
  } catch (error) {
    console.log(error);
    res.status(500).end();
  }
}

function generateToken(user) {
  const payload = {
    id: user.id,
    firstname: user.firstname,
    lastname: user.lastname,
    role: user.role,
    entite: user.entite,
  };
  const secretKey = process.env.KEY;
  const options = { expiresIn: 60 * 60 }; // 60 minutes
  const token = Jwt.sign(payload, secretKey, options);
  return token;
}

// TODO : refactoriser les deux méthodes de login?
export async function login(req, res) {
  const isSecure = compareIp(req);
  if (Number(process.env.VERIFY_IP) && !isSecure) {
    return res.status(403).json({ error: "Connexion non autorisée" });
  }

  const { id, accessCode } = req.body;

  const user = await User.findUniqueForLogin("id", id);
  if (!user) {
    return res.status(403).json({ error: "Utilisateur introuvable" });
  }

  if (!user.status) {
    return res.status(403).json({ error: "Compte désactivé" });
  }

  if (!(await bcrypt.compare(accessCode, user.accessCode))) {
    return res.status(403).json({ error: "Code d'access erroné" });
  }

  const token = generateToken(user);
  res.send(token);
}

export async function externalLogin(req, res) {
  const { email, password } = req.body;

  const user = await User.findUniqueForLogin("email", email);
  if (!user) {
    return res
      .status(403)
      .json({ error: "Adresse email ou mot de passe erroné" });
  }

  if (!user.status) {
    return res.status(403).json({ error: "Compte désactivé" });
  }

  if (!(await bcrypt.compare(password, user.password))) {
    return res
      .status(403)
      .json({ error: "Adresse email ou mot de passe erroné" });
  }

  const token = generateToken(user);
  res.send(token);
}
