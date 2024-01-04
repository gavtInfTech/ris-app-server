import * as AlertService from "../service/AlertService";

export const getAll = async (req, res) => {
  try {
    let rifts = await AlertService.getAll();

    if (!rifts) {
      throw new Error("Rifts not found!");
    }

    return res.send(rifts);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const getAllByPeriodAndRiver = async (req, res) => {
  try {
    let alerts = await AlertService.getAllByPeriodAndRiver(
      req.query.startPeriod,
      req.query.endPeriod,
      req.query.river
    );

    if (!alerts) {
      throw new Error("Alerts not found!");
    }

    return res.send(alerts);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const add = async (req, res) => {
  try {
    if (!req.body.river) {
      throw new Error("River is not defined!");
    }

    await AlertService.add(req.body);

    return res.send("Уведомление успешно добавлено!");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const change = async (req, res) => {
  try {
    if (!req.body.river) {
      throw new Error("River is not defined!");
    }

    await AlertService.change(req.body);

    return res.send("Уведомление успешно изменено!");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const deleteById = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error("ID is required!");
    }

    await AlertService.deleteById(req.params.id);

    return res.end();
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};
