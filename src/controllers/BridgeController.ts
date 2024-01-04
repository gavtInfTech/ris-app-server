import * as BridgeGabService from "../service/BridgeGabService";

export const add = async (req, res) => {
  try {
    let bridge = await BridgeGabService.add(req.body);

    if (bridge === undefined) {
      return res
        .status(405)
        .send("Подмостовые габариты на текующий день уже существуют!");
    }

    return res.send("Подмостовые габариты успешно добавлены!");
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

    await BridgeGabService.change(req.body);

    return res.send("Уровень успешно изменен!");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const deleteById = async (req, res) => {
  try {

    if (!req.params.id) {
      throw new Error("Invalid id!");
    }

    await BridgeGabService.deleteById(req.params.id);
    return res.end();
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const deleteByIdWithConfirm = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error("Идентификатор уровня не предоставлен.");
    }

    await BridgeGabService.deleteByIdWithConfirm(req.params.id);
    return res.end();
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const getAllByDate = async (req, res) => {
  try {

    if (!req.query.date) {
      throw new Error("Date is required!");
    }

    let bridges = await BridgeGabService.getAllByDate(req.query.date);

    return res.send(bridges);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const getAllByPeriod = async (req, res) => {
  try {

    if (!req.query.startPeriod) {
      throw new Error("startPeriod is required!");
    }

    if (!req.query.endPeriod) {
      throw new Error("endPeriod is required!");
    }

    let bridges = await BridgeGabService.getAllByPeriod(
      req.query.startPeriod,
      req.query.endPeriod
    );

    return res.send(bridges);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const getAllByBridge = async (req, res) => {
  try {

    if (!req.query.bridge) {
      throw new Error("bridge is required!");
    }

    let bridges = await BridgeGabService.getAllByBridge(req.query.bridge);
    
    return res.send(bridges);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const getLast = async (req, res) => {
  try {
    
    let bridges = await BridgeGabService.getLastBridgeGabs();

    return res.send(bridges);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};
