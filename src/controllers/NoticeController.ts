import * as NoticeService from "../service/NoticeService";

export const add = async (req, res) => {
  let notice = await NoticeService.add(req.body);
  return res.send("Габариты судоходного хода успешно добавлены!");
};

export const change = async (req, res) => {
  await NoticeService.change(req.body);
  return res.send("Уровень успешно изменен!");
};

export const deleteById = async (req, res) => {
  await NoticeService.deleteById(req.params.id);
  return res.end();
};

export const getAll = async (req, res) => {
  let notices = await NoticeService.getAll();
  return res.send(notices);
};

export const getAllByDate = async (req, res) => {
  let notices = await NoticeService.getAllByDate(req.query.date);
  return res.send(notices);
};

export const getAllByPeriod = async (req, res) => {
  let notices = await NoticeService.getAllByPeriod(
    req.query.startPeriod,
    req.query.endPeriod
  );
  return res.send(notices);
};

export const getCurrentNotices = async (req, res) => {
  let date;
  const currentDate = new Date();
  const currentHours = currentDate.getHours();
  if (currentHours < 12) {
    date = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() - 1,
      0,
      0,
      0
    );
  } else date = currentDate;
  let notices = await NoticeService.getAllByDate(date);
  return res.send(notices);
};
