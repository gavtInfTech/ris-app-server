import * as BridgeService from "../service/BridgeService";

export const add = async (req, res) => {
    let bridge = await BridgeService.add(req.body);
    if (bridge === undefined) {
        return res.send("Подмостовые габариты на текующий день уже существует!")
    }
    return res.send("Подмостовые габариты успешно добавлены!")
}

export const change = async (req, res) => {
    await BridgeService.change(req.body);
    return res.send("Уровень успешно изменен!")
}

export const deleteById = async (req, res) => {
    await BridgeService.deleteById(req.params.id);
    return res.end();
}

export const getLevelsByDate = async (req, res) => {
    let hydroposts = await BridgeService.getAllByDate(req.body.date);
    return res.send(hydroposts);
}

export const getAllByBridge = async (req, res) => {
    let levels = await BridgeService.getAllByBridge(req.body.bridge);
    return res.send(levels);
}