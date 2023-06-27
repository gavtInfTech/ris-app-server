import * as BridgeGabService from "../service/BridgeGabService";

export const add = async (req, res) => {
    let bridge = await BridgeGabService.add(req.body);
    if (bridge === undefined) {
        return res.status(405).send("Подмостовые габариты на текующий день уже существуют!")
    }
    return res.send("Подмостовые габариты успешно добавлены!")
}

export const change = async (req, res) => {
    await BridgeGabService.change(req.body);
    return res.send("Уровень успешно изменен!")
}

export const deleteById = async (req, res) => {
    await BridgeGabService.deleteById(req.params.id);
    return res.end();
}

export const getAllByDate = async (req, res) => {
    let bridges = await BridgeGabService.getAllByDate(req.query.date);
    return res.send(bridges);
}

export const getAllByBridge = async (req, res) => {
    let bridges = await BridgeGabService.getAllByBridge(req.query.bridge);
    return res.send(bridges);
}