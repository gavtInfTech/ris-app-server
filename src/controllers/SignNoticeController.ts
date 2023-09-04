import * as SignNoticeService from "../service/SignNoticeService";

export const add = async (req, res) => {
    let depth = await SignNoticeService.add(req.body);
    return res.send("Уведомление о знаке успешно добавлено!")
}

export const getAllByPeriodAndRiver = async (req, res) => {
    let signNotices = await SignNoticeService.getAllByPeriodAndRiver(req.query.startPeriod, req.query.endPeriod, req.river);
    return res.send(signNotices);
}