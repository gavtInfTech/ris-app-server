import * as SiteAccordanceService from "../service/SiteAccordanceService";

export const add = async (req, res) => {
  try {
    if (!req.body) {
      throw new Error(
        "Отсутствуют данные для добавления информации об участке."
      );
    }

    let depth = await SiteAccordanceService.add(req.body);
    return res.send("Информация об участке успешно добавлена!");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const getAll = async (req, res) => {
  try {
    let accordances = await SiteAccordanceService.getAll();
    return res.send(accordances);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const getAllByPeriodAndRiver = async (req, res) => {
  try {
    if (!req.query.startPeriod || !req.query.endPeriod || !req.query.river) {
      throw new Error(
        "Начальный период, конечный период или река не предоставлены."
      );
    }

    let accordances = await SiteAccordanceService.getAllByPeriodAndRiver(
      req.query.startPeriod,
      req.query.endPeriod,
      req.query.river
    );
    return res.send(accordances);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};
