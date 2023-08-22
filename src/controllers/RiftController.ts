import * as RiftService from "../service/RiftService";

export const getAll = async (req, res) => {
    let rifts = await RiftService.getAll();
    return res.send(rifts);
}