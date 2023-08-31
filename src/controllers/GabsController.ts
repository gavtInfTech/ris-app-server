import * as GabsService from "../service/GabsService";

export const add = async (req, res) => {
    let depth = await GabsService.add(req.body);
    if (depth === undefined) {
        return res.status(405).send("Габариты судового хода на текующий день уже существуют!")
    }
    return res.send("Подмостовые габариты успешно добавлены!")
}

export const change = async (req, res) => {
    await GabsService.change(req.body);
    return res.send("Уровень успешно изменен!")
}

export const deleteById = async (req, res) => {
    await GabsService.deleteById(req.params.id);
    return res.end();
}

export const getAllByDate = async (req, res) => {
    let depths = await GabsService.getAllByDate(req.query.date);
    return res.send(depths);
}

export const getAllByPeriod = async (req, res) => {
    let depths = await GabsService.getAllByPeriod(req.query.startPeriod, req.query.endPeriod);
    return res.send(depths);
}

export const getAllByPeriodAndRiver = async (req, res) => {
    let depths = await GabsService.getAllByPeriodAndRiver(req.query.startPeriod, req.query.endPeriod, req.river);
    return res.send(depths);
}

export const getAllBySite = async (req, res) => {
    let depths = await GabsService.getAllBySite(req.query.site);
    return res.send(depths);
}