import * as ChangeService from "../service/ChangeService";

export const add = async (req, res) => {
    let change = await ChangeService.add(req.body);
    return res.send("Изменение успешно сохранено!");
  };

  export const getBySession = async (req, res) => {
    let changes = await ChangeService.getBySession(req.params.session);
    return res.send(changes);
  }