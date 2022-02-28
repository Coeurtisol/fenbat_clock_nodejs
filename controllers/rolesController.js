import Role from "../models/Role.js";

export async function getAll(req, res) {
  try {
    const roles = await Role.getAll();
    res.json(roles);
  } catch (error) {
    // console.log(error);
    res.status(500).end();
  }
}

export async function create(req, res) {
  const role = req.body;
  try {
    const newRole = new Role(role);
    const data = await newRole.save();
    res.json(data);
  } catch (error) {
    // console.log(error);
    res.status(500).end();
  }
}

export async function update(req, res) {
  const id = Number(req.params.id);
  const updatedRole = req.body;
  updatedRole.permissionId = Number(updatedRole.permissionId);
  try {
    const data = await Role.update(id, updatedRole);
    res.json(data);
  } catch (error) {
    // console.log(error);
    res.status(500).end();
  }
}

export async function deleteOne(req, res) {
  const id = Number(req.params.id);
  try {
    const data = await Role.delete(id);
    res.json(data);
  } catch (error) {
    // console.log(error);
    res.status(500).end();
  }
}
