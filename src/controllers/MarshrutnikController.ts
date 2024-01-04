import * as MarshrutnikService from "../service/MarshrutnikService";

export const deleteMarshrut = async (req, res) => {
  try {
    await MarshrutnikService.deleteById(req.params.id);
    return res.end();
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const add = async (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Отсутствуют данные для добавления маршрутника.");
    }

    let notice = await MarshrutnikService.add(req.body);
    return res.send("Маршрутник успешно добавлен!");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const changeMarshrut = async (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Отсутствуют данные для изменения маршрутника.");
    }

    await MarshrutnikService.change(req.body);
    return res.end();
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const getAllMarshruts = async (req, res) => {
  try {
    let marshrutnik = await MarshrutnikService.getAll();
    return res.send(marshrutnik);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};
