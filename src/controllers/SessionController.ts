import * as SessionService from "../service/SessionService";

export const getByMonth = async (req, res) => {
    let sessions = await SessionService.getByMonth(req.params.month, req.params.river);
    return res.send(sessions);
}

export const add = async (req, res) => {
    let notice = await SessionService.add(req.body);
    return res.send("Сессия успешно сохранена!");
  };