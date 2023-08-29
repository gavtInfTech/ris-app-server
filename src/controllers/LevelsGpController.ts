import * as LevelsGpService from "../service/LevelsGpService";

export const add = async (req, res) => {
    let level = await LevelsGpService.add(req.body);
    if (level === undefined) {
        return res.status(405).send("Уровень на текующий день уже существует!")
    }
    return res.send("Уровень успешно добавлен!")
}

export const change = async (req, res) => {
    await LevelsGpService.change(req.body);
    return res.send("Уровень успешно изменен!")
}

export const deleteById = async (req, res) => {
    await LevelsGpService.deleteById(req.params.id);
    return res.end();
}

export const getAll = async (req, res) => {
    let hydroposts = await LevelsGpService.getAll();
    return res.send(hydroposts);
}

export const getAllByDate = async (req, res) => {
    let hydroposts = await LevelsGpService.getAllByDate(req.query.date);
    return res.send(hydroposts);
}

export const getAllByPeriod = async (req, res) => {
    let hydroposts = await LevelsGpService.getAllByPeriod(req.query.startPeriod, req.query.endPeriod);
    return res.send(hydroposts);
}

export const getAllByPeriodAndRiver = async (req, res) => {
    let hydroposts = await LevelsGpService.getAllByPeriodAndRiver(req.query.startPeriod, req.query.endPeriod, req.query.river);
    return res.send(hydroposts);
}

export const getAllByHydropost = async (req, res) => {
    let levels = await LevelsGpService.getAllByHydropost(req.query.hydropost);
    return res.send(levels);
}