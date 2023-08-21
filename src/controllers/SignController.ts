import * as SignService from "../service/SignService";

export const getAll = async (req, res) => {
    let signs = await SignService.getAll();
    return res.send(signs);
}
