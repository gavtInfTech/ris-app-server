import * as SignNoticeService from "../service/SignNoticeService";

export const add = async (req, res) => {
  try {
    if (!req.body.sign) {
      throw new Error("SIGN ID IS NULL");
    }
    if (!req.body.date) {
      throw new Error("SIGN DATE IS NULL");
    }
    if (!req.body.comment) {
      throw new Error("SIGN COMMENT IS NULL");
    }

    let depth = await SignNoticeService.add(req.body);
    return res.send("Уведомление о знаке успешно добавлено!");
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const getAll = async (req, res) => {
  try {
    let siteNotices = await SignNoticeService.getAll();
    return res.send(siteNotices);
  } catch (error) {
    return res.status(400).send(error.message);
  }
};

export const getAllByPeriodAndRiver = async (req, res) => {
  try {
    
    if (!req.query.session || !req.query.river) {
      throw new Error(
        "Проблема с сессией или река не предоставлена."
      );
    }

    let signNotices = await SignNoticeService.getAllByPeriodAndRiver(
      req.query.session,
      req.query.river
    );
    
    return res.send(signNotices);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};