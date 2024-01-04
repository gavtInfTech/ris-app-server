import * as ClientService from "../service/ClientService";
import CryptoJS from "crypto-js";

export const registration = async (req, res) => {
<<<<<<< HEAD
  try {
    if (!req.body.email) {
      throw new Error("Email is required!");
    }

    if (await ClientService.findByEmail(req.body.email)) {
      return res.status(409).send("Пользователь уже существует!");
    } else {
      await ClientService.save(req.body);
      return res.end();
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const deleteClient = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error("ID is required!");
    }

    if (!req.user.role) {
      throw new Error("Role is required!");
    }

    if (req.user.id === req.params.id || req.user.role === "Администратор") {
      await ClientService.deleteById(req.params.id);
      return res.end();
    } else {
      return res
        .status(401)
        .send("У пользователя нет прав на соверешение операции!");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const getAllClients = async (req, res) => {
  try {
    let users = await ClientService.getAll();
    return res.send(users);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const change = async (req, res) => {
  try {
    if (!req.user) {
      throw new Error("User is required!");
    }

    if (req.user.id === req.body.id || req.user.role === "Администратор") {
      await ClientService.change(req.body);
      return res.end();
    } else {
      return res
        .status(401)
        .send("У пользователя нет прав на соверешение операции!");
    }
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
=======
  if (await ClientService.findByEmail(req.body.email)) {
    return res.status(409).send("Пользователь уже существует!");
  } else {
    await ClientService.save(req.body);
    return res.send("Пользователь успешно добавлен!");
  }
};

export const login = async (req, res) => {
  let client = await ClientService.findByEmail(req.body.email);
  if (client) {
    let isPasswordCorrect =
      req.body.password ===
      CryptoJS.AES.decrypt(client.password, "jhfycghdbndhfjhweiru").toString(
        CryptoJS.enc.Utf8
      );

    if (!isPasswordCorrect) {
      return res.status(404).send("Неверный пароль!");
    }
    return res.send({role:"Клиент", email: client.email, fio: client.fio});
  }

  return res.status(404).send("Пользователь не найден!");
};

export const authCheck = async (req, res) => {
  try {
    let client = await ClientService.findByEmail(req.body.email);
    if (client) {
      return res.send({ fio: client.fio, email: client.email });
    } else {
      return res.status(401).send("Пользователь не авторизирован!");
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("Произошла ошибка на сервере");
>>>>>>> 61fbec8379cbdecd4c73ea61d6beea5bd538db67
  }
};
 