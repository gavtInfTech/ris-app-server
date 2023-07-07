import * as DislocationService from "../service/DislocationService";

export const add = async (req, res) => {
    let notice = await DislocationService.add(req.body);
    return res.send("Дислокация тех. флота успешно добавлены!")
}

export const change = async (req, res) => {
    await DislocationService.change(req.body);
    return res.send("Дислокация тех. флота успешно изменена!")
}

export const deleteById = async (req, res) => {
    await DislocationService.deleteById(req.params.id);
    return res.end();
}

export const getAllByOrganisation = async (req, res) => {
    let dislocations = await DislocationService.getAllByOrganisation(req.query.organisationName);
    return res.send(dislocations);
}

export const getAllByDate = async (req, res) => {
    let dislocations = await DislocationService.getAllByDate(req.query.date);
    return res.send(dislocations);
}

export const getAllByPeriod = async (req, res) => {
    let dislocations = await DislocationService.getAllByPeriod(req.query.startPeriod, req.query.endPeriod);
    return res.send(dislocations);
}