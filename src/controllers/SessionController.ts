import * as SessionService from "../service/SessionService";

export const getByMonth = async (req, res) => {
    let session = await SessionService.getByMonth(req.query.month, req.query.river);
    return res.send(session);
}

export const add = async (req, res) => {
    let session = await SessionService.add(req.body);
    return res.send("Сессия успешно сохранена!");
  };