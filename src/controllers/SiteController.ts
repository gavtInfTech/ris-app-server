import * as SiteService from "../service/SiteService";

export const getAll = async (req, res) => {
    let sites = await SiteService.getAll();
    return res.send(sites);
}

export const getAllByRiver = async (req, res) => {
    let sites = await SiteService.getAllByRiver(req.query.river);
    return res.send(sites);
}

export const add = async (req, res) => {
    let site = await SiteService.add(req.body);
    return res.send("Участок успешно добавлен!");
  };

export const change = async (req, res) => {
    await SiteService.change(req.body);
    return res.send("Участок успешно изменен!");
};

export const deleteById = async (req, res) => {
    await SiteService.deleteById(req.params.id);
    return res.end();
};