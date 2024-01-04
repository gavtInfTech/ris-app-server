import * as LevelsGpService from "../service/LevelsGpService";

export const add = async (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Отсутствуют данные для добавления уровня.");
    }

    let level = await LevelsGpService.add(req.body);

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

    await LevelsGpService.change(req.body);
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

    await LevelsGpService.deleteById(req.params.id);
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

    await LevelsGpService.deleteByIdWithConfirm(req.params.id);
    return res.end();
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};


export const getAll = async (req, res) => {
  try {
    let hydroposts = await LevelsGpService.getAll();
    return res.send(hydroposts);
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

    let hydroposts = await LevelsGpService.getAllByDate(req.query.date);
    return res.send(hydroposts);
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

    let hydroposts = await LevelsGpService.getAllByPeriod(
      req.query.startPeriod,
      req.query.endPeriod
    );
    return res.send(hydroposts);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const getAllByPeriodAndRiver = async (req, res) => {
  try {
    if (!req.query.startPeriod || !req.query.endPeriod || !req.query.river) {
      throw new Error(
        "Начальная и/или конечная дата периода и/или река не предоставлены."
      );
    }

    let hydroposts = await LevelsGpService.getAllByPeriodAndRiver(
      req.query.startPeriod,
      req.query.endPeriod,
      req.query.river
    );
    return res.send(hydroposts);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const getAllByHydropost = async (req, res) => {
  try {
    if (!req.query.hydropost) {
      throw new Error("Идентификатор гидропоста не предоставлен.");
    }

    let levels = await LevelsGpService.getAllByHydropost(req.query.hydropost);
    return res.send(levels);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};
