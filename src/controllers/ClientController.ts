import * as ClientService from "../service/ClientService";
import * as jwt from "jsonwebtoken";

export const registration = async (req, res) => {
  if (await ClientService.findByEmail(req.body.email)) {
    return res.status(409).send("Пользователь уже существует!");
  } else {
    await ClientService.save(req.body);
    return res.end();
  }
};

export const deleteClient = async (req, res) => {
  if (req.user.id === req.params.id || req.user.role === "Администратор") {
    await ClientService.deleteById(req.params.id);
    return res.end();
  } else {
    return res
      .status(401)
      .send("У пользователя нет прав на соверешение операции!");
  }
};

export const getAllClients = async (req, res) => {
  let users = await ClientService.getAll();
  return res.send(users);
};

export const change = async (req, res) => {
  console.log(req.user);
  if (req.user.id === req.body.id || req.user.role === "Администратор") {
    await ClientService.change(req.body);
    return res.end();

  } else {
    return res
    .status(401)
    .send("У пользователя нет прав на соверешение операции!");
  }
};
