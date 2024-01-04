import * as LevelsGuService from "../service/LevelsGuService";

export const add = async (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Отсутствуют данные для добавления уровня.");
    }

    let level = await LevelsGuService.add(req.body);
    if (level === undefined) {
      return res.status(405).send("Уровень на текущий день уже существует!");
    }
    return res.send("Уровень успешно добавлен!");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const change = async (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Отсутствуют данные для изменения уровня.");
    }

    await LevelsGuService.change(req.body);
    return res.send("Уровень успешно изменен!");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const deleteById = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error("Идентификатор уровня не предоставлен.");
    }

    await LevelsGuService.deleteById(req.params.id);
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

    await LevelsGuService.deleteByIdWithConfirm(req.params.id);
    return res.end();
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};


export const getAll = async (req, res) => {
  try {
    let hydronodes = await LevelsGuService.getAll();
    return res.send(hydronodes);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const getAllByDate = async (req, res) => {
  try {
    if (!req.query.date) {
      throw new Error("Дата не предоставлена.");
    }

    let hydronodes = await LevelsGuService.getAllByDate(req.query.date);
    return res.send(hydronodes);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const getAllByPeriod = async (req, res) => {
  try {
    if (!req.query.startPeriod || !req.query.endPeriod) {
      throw new Error(
        "Начальная и/или конечная дата периода не предоставлена."
      );
    }

    let hydronodes = await LevelsGuService.getAllByPeriod(
      req.query.startPeriod,
      req.query.endPeriod
    );
    return res.send(hydronodes);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const getAllByHydronode = async (req, res) => {
  try {
    if (!req.query.hydropost) {
      throw new Error("Идентификатор гидронода не предоставлен.");
    }

    let levels = await LevelsGuService.getAllByHydronode(req.query.hydropost);
    return res.send(levels);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const getLastLevels = async (req, res) => {
  try {
    let hydronodes = await LevelsGuService.getLastLevels();
    return res.send(hydronodes);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};
