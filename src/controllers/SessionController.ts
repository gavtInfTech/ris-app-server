import * as SessionService from "../service/SessionService";

export const getByMonth = async (req, res) => {
  try {
    if (!req.query.month || !req.query.river) {
      throw new Error("Не предоставлен месяц и/или река.");
    }

    let session = await SessionService.getByMonth(
      req.query.month,
      req.query.river
    );

    return res.send(session);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const add = async (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Отсутствуют данные для добавления сессии.");
    }

    let session = await SessionService.add(req.body);
    
    return res.send("Сессия успешно сохранена!");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};
