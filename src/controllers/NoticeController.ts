import * as NoticeService from "../service/NoticeService";

export const add = async (req, res) => {
  try {
    if (!req.body) {
      throw new Error(
        "Отсутствуют данные для добавления габаритов судоходного хода."
      );
    }

    let notice = await NoticeService.add(req.body);
    
    return res.send("Габариты судоходного хода успешно добавлены!");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const change = async (req, res) => {
  try {
    if (!req.body) {
      throw new Error("Отсутствуют данные для изменения уровня.");
    }

    await NoticeService.change(req.body);

    return res.send("Уровень успешно изменен!");
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const deleteById = async (req, res) => {
  try {
    if (!req.params.id) {
      throw new Error(
        "Идентификатор габаритов судоходного хода не предоставлен."
      );
    }

    await NoticeService.deleteById(req.params.id);

    return res.end();
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const getAll = async (req, res) => {
  try {

    let notices = await NoticeService.getAll();

    return res.send(notices);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const getAllByDate = async (req, res) => {
  try {
    if (!req.query.date) {
      throw new Error("Дата не предоставлена.");
    }

    let notices = await NoticeService.getAllByDate(req.query.date);

    return res.send(notices);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const getAllByPeriod = async (req, res) => {
  try {
    if (!req.query.startPeriod || !req.query.endPeriod) {
      throw new Error(
        "Начальная и/или конечная дата периода не предоставлена."
      );
    }

    let notices = await NoticeService.getAllByPeriod(
      req.query.startPeriod,
      req.query.endPeriod
    );

    return res.send(notices);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};

export const getCurrentNotices = async (req, res) => {
  try {
    let date;
    const currentDate = new Date();
    const currentHours = currentDate.getHours();
    if (currentHours < 11) {
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
    notices = notices.map((notice) => {
      let cause = "";
      if (notice.cause1) {
        cause += "Изменение СНО; ";
      }
      if (notice.cause2) {
        cause += "Метеологические условия; ";
      }
      if (notice.cause3) {
        cause += "Опасно для жизни; ";
      }
      return { ...notice, cause: cause };
    });
    return res.send(notices);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};
