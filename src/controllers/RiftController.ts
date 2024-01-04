import * as RiftService from "../service/RiftService";

export const getAll = async (req, res) => {
  try {
    let rifts = await RiftService.getAll();
    return res.send(rifts);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
}

export const change = async (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Отсутствуют данные для изменения переката.");
    }

    await RiftService.change(req.body);
    return res.send("Перекат успешно изменен!");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};
