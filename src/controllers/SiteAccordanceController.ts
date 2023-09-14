import * as SiteAccordanceService from "../service/SiteAccordanceService";

export const add = async (req, res) => {
    let depth = await SiteAccordanceService.add(req.body);
    return res.send("Информация об участке успешно добавлена!")
}

export const getAll = async (req, res) => {
    let accordances = await SiteAccordanceService.getAll();
    return res.send(accordances);
}

export const getAllByPeriodAndRiver = async (req, res) => {
    let accordances = await SiteAccordanceService.getAllByPeriodAndRiver(req.query.startPeriod, req.query.endPeriod, req.query.river);
    return res.send(accordances);
}