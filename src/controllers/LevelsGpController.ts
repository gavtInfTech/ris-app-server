import * as LevelsGpService from "../service/LevelsGpService";

export const add = async (req, res) => {
    let level = await LevelsGpService.add(req.body);
    if (level === undefined) {
        return res.send("Уровень на текующий день уже существует!")
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

export const getTodayLevels = async (req, res) => {
    let hydroposts = await LevelsGpService.getLevelsByDate(req.body.date);
    return res.send(hydroposts);
}

export const getAllByHydropost = async (req, res) => {
    let levels = await LevelsGpService.getAllByHydropost(req.body.hydropost);
    return res.send(levels);
}