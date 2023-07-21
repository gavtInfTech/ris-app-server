import * as UserService from "../service/UserService";
import * as ClientService from "../service/ClientService";
import CryptoJS from "crypto-js";
import * as jwt from "jsonwebtoken";

export const registration = async (req, res) => {
  if (req.body.password !== req.body.repeatPassword) {
    return res.status(404).send("Пароли не совпадают!");
  }
  if (await UserService.findByUsername(req.body.username)) {
    return res.status(409).send("Пользователь уже существует!");
  } else {
    await UserService.save(req.body);
    return res.send("Пользователь успешно добавлен!");
  }
};

export const login = async (req, res) => {
  let user = await UserService.findByUsername(req.body.username);
  if (user) {
    let isPasswordCorrect = req.body.password === CryptoJS.AES.decrypt(user.password, "jhfycghdbndhfjhweiru").toString(CryptoJS.enc.Utf8);
  
    if (!isPasswordCorrect) {
      return res.status(404).send("Неверный пароль!");
    }
  
    const token = jwt.sign(
      { id: user.id, role: user.role, organisation: user.organisation.name },
      "rissecretkey"
    );
    return res
      .cookie("auth", token, { httpOnly: true, maxAge: 604800000 })
      .status(200)
      .send({ role: user.role, organisation: user.organisation.name });
  }
 
  let client = await ClientService.findByEmail(req.body.username);
  console.log(client)
  if (client) {
    let isPasswordCorrect = req.body.password === CryptoJS.AES.decrypt(client.password, "jhfycghdbndhfjhweiru").toString(CryptoJS.enc.Utf8);
  
    if (!isPasswordCorrect) {
      return res.status(404).send("Неверный пароль!");
    }
  
    const token = jwt.sign(
      { id: client.id, role: "Клиент", fio: client.fio, email: client.email},
      "rissecretkey"
    );
    return res
      .cookie("auth", token, { httpOnly: true, maxAge: 604800000 })
      .status(200)
      .send({ id: client.id, role: "Клиент" });
  }

      return res.status(404).send("Пользователь не найден!");
    
};

export const logout = async (req, res) => {
  return res.clearCookie("auth", { httpOnly: true }).end();
};

export const deleteUser = async (req, res) => {
  await UserService.deleteById(req.params.id);
  return res.end();
};

export const findAllUsers = async (req, res) => {
  let users = await UserService.findAll();
  return res.send(users);
};

export const authCheck = async (req, res) => {
  const token = req.cookies.auth;
  if (token) {
    jwt.verify(token, "rissecretkey", (err, data) => {
      if (err) return res.status(403).send("Токен не валиден!");

      if (data.role === "Администратор" || data.role === "Оператор")
        return res.send({ role: data.role, organisation: data.organisation });
      else if (data.role === "Клиент")
        return res.send({ id: data.id, role: data.role });
    });
  } else return res.status(401).send("Пользователь не авторизирован!");
};
