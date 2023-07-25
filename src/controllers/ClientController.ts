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

export const deleteClient= async (req, res) => {
  await ClientService.deleteById(req.params.id);
  return res.end();
};

export const getAllClients = async (req, res) => {
  let users = await ClientService.getAll();
  return res.send(users);
};

export const change = async (req, res) => {
  await ClientService.change(req.body);
  return res.send("Клиент успешно изменен!")
}