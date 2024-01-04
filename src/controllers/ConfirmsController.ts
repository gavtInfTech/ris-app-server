import * as ConfirmsService from "../service/AllConfirmsService";

export const getAllUnconfirmedData = async (req, res) => {
  try {

    const result = await ConfirmsService.getAllUnconfirmedData();

    return res.send(result);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const confirmAdd = async (req, res) => {
  try {

    if (!req.body.organisation) {
      throw new Error("Organisation is required!");
    }

    await ConfirmsService.confirmAdd(req.body);

    return res.send("Дислокация тех. флота успешно изменена!");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const confirmDelete = async (req, res) => {
    try {
  
      if (!req.body.organisation) {
        throw new Error("Organisation is required!");
      }
  
      await ConfirmsService.confirmDelete(req.body);
  
      return res.send("Дислокация тех. флота успешно изменена!");
    } catch (error) {
      console.log(error);
      return res.status(400).send(error.message);
    }
  };

  export const confirmChange = async (req, res) => {
    try {
  
      if (!req.body.organisation) {
        throw new Error("Organisation is required!");
      }
  
      await ConfirmsService.confirmChange(req.body);
  
      return res.send("Дислокация тех. флота успешно изменена!");
    } catch (error) {
      console.log(error);
      return res.status(400).send(error.message);
    }
  };
  

export const reject = async (req, res) => {
  try {

    if (!req.params.id) {
      throw new Error("ID is required!");
    }

    await ConfirmsService.reject(req.params.id);

    return res.end();
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};