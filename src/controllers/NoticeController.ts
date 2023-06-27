import * as NoticeService from "../service/NoticeService";

export const add = async (req, res) => {
    let notice = await NoticeService.add(req.body);
    return res.send("Габариты судоходного хода успешно добавлены!")
}

export const change = async (req, res) => {
    await NoticeService.change(req.body);
    return res.send("Уровень успешно изменен!")
}

export const deleteById = async (req, res) => {
    await NoticeService.deleteById(req.params.id);
    return res.end();
}

export const getAll = async (req, res) => {
    let notices = await NoticeService.getAll();
    return res.send(notices);
}

export const getAllByDate = async (req, res) => {
    let notices = await NoticeService.getAllByDate(req.query.date);
    return res.send(notices);
}

// export const getAllBySite = async (req, res) => {
//     let notices = await NoticeService.getAllBySite(req.query.site);
//     return res.send(notices);
// }