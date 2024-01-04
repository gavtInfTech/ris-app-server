import * as SiteService from "../service/SiteService";

export const getAll = async (req, res) => {
    try {
        let sites = await SiteService.getAll();
        return res.send(sites);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Произошла ошибка при получении данных об участках.");
    }
}

export const getAllByRiver = async (req, res) => {
    try {
        let sites = await SiteService.getAllByRiver(req.query.river);
        return res.send(sites);
    } catch (error) {
        console.error(error);
        return res.status(500).send("Произошла ошибка при получении данных об участках по реке.");
    }
}

export const add = async (req, res) => {
    try {
        let site = await SiteService.add(req.body);
        return res.send("Участок успешно добавлен!");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Произошла ошибка при добавлении участка.");
    }
}

export const change = async (req, res) => {
    try {
        await SiteService.change(req.body);
        return res.send("Участок успешно изменен!");
    } catch (error) {
        console.error(error);
        return res.status(500).send("Произошла ошибка при изменении участка.");
    }
}

export const deleteById = async (req, res) => {
    try {
        await SiteService.deleteById(req.params.id);
        return res.end();
    } catch (error) {
        console.error(error);
        return res.status(500).send("Произошла ошибка при удалении участка.");
    }
}