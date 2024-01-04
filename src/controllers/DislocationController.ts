import * as DislocationService from "../service/DislocationService";

export const add = async (req, res) => {
  try {

    if (!req.body.organisation) {
      throw new Error("Organisation is required!");
    }

    await DislocationService.add(req.body);

    return res.send("Дислокация тех. флота успешно добавлена!");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const change = async (req, res) => {
  try {

    if (!req.body.organisation) {
      throw new Error("Organisation is required!");
    }

    await DislocationService.change(req.body);

    return res.send("Дислокация тех. флота успешно изменена!");
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

    await DislocationService.deleteById(req.params.id);

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

    await DislocationService.deleteByIdWithConfirm(req.params.id);
    return res.end();
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const getAllByOrganisation = async (req, res) => {
  try {

    if (!req.query.organisationName) {
      throw new Error("Organisation is required!");
    }

    let dislocations = await DislocationService.getAllByOrganisation(
      req.query.organisationName
    );

    return res.send(dislocations);
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

    let dislocations = await DislocationService.getAllByDate(req.query.date);
    return res.send(dislocations);

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

    let dislocations = await DislocationService.getAllByPeriod(
      req.query.startPeriod,
      req.query.endPeriod
    );

    return res.send(dislocations);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};
