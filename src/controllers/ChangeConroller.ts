import * as ChangeService from "../service/ChangeService";

export const add = async (req, res) => {
    let change = await ChangeService.add(req.body);
    return res.send("Изменение успешно сохранено!");
  };