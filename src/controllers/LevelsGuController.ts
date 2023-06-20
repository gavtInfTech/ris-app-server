import * as LevelsGuService from "../service/LevelsGuService";

export const add = async (req, res) => {
    let level = await LevelsGuService.add(req.body);
    if (level === undefined) {
        return res.status(405).send("Уровень на текующий день уже существует!")
    }
    return res.send("Уровень успешно добавлен!")
}

export const change = async (req, res) => {
    await LevelsGuService.change(req.body);
    return res.send("Уровень успешно изменен!")
}

export const deleteById = async (req, res) => {
    await LevelsGuService.deleteById(req.params.id);
    return res.end();
}

export const getAllByDate = async (req, res) => {
    let hydroposts = await LevelsGuService.getAllByDate(req.body.date);
    return res.send(hydroposts);
}

export const getAllByHydronode = async (req, res) => {
    let levels = await LevelsGuService.getAllByHydronode(req.query.hydropost);
    return res.send(levels);
}