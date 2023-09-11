import * as RiftService from "../service/RiftService";

export const getAll = async (req, res) => {
    let rifts = await RiftService.getAll();
    return res.send(rifts);
}

export const change = async (req, res) => {
    await RiftService.change(req.body);
    return res.send("Перекат успешно изменен!");
};