import * as SignService from "../service/SignService";

export const getAll = async (req, res) => {
  try {
    let signs = await SignService.getAll();
    return res.send(signs);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
}

export const change = async (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Отсутствуют данные для изменения знака.");
    }

    await SignService.change(req.body);
    return res.send("Знак успешно изменен!");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const deleteById = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error("Идентификатор знака не предоставлен.");
    }

    await SignService.deleteSignWithNoticesById(req.params.id);
    return res.send("Знак успешно удален!");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};
