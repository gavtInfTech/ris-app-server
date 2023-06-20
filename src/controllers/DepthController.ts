import * as DepthsService from "../service/DepthService";

export const add = async (req, res) => {
    let depth = await DepthsService.add(req.body);
    if (depth === undefined) {
        return res.status(405).send("Габариты судового хода на текующий день уже существуют!")
    }
    return res.send("Подмостовые габариты успешно добавлены!")
}

export const change = async (req, res) => {
    await DepthsService.change(req.body);
    return res.send("Уровень успешно изменен!")
}

export const deleteById = async (req, res) => {
    await DepthsService.deleteById(req.params.id);
    return res.end();
}

export const getAllByDate = async (req, res) => {
    let depths = await DepthsService.getAllByDate(req.body.date);
    return res.send(depths);
}

export const getAllBySite = async (req, res) => {
    let depths = await DepthsService.getAllBySite(req.query.site);
    return res.send(depths);
}