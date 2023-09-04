import * as AlertService from "../service/AlertService";

export const getAll = async (req, res) => {
    let rifts = await AlertService.getAll();
    return res.send(rifts);
}

export const getAllByPeriodAndRiver = async (req, res) => {
    let alerts = await AlertService.getAllByPeriodAndRiver(req.query.startPeriod, req.query.endPeriod, req.query.river);
    return res.send(alerts);
}

export const add = async (req, res) => {
    let notice = await AlertService.add(req.body);
    return res.send("Уведомление успешно добавлено!");
  };

export const change = async (req, res) => {
    await AlertService.change(req.body);
    return res.send("Уведомление успешно изменен!");
};

export const deleteById = async (req, res) => {
    await AlertService.deleteById(req.params.id);
    return res.end();
};