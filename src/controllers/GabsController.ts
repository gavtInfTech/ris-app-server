import * as GabsService from "../service/GabsService";

export const add = async (req, res) => {
    try{

        let depth = await GabsService.add(req.body);

        if (depth === undefined) {
            return res.status(405).send("Габариты судового хода на текующий день уже существуют!")
        }
        return res.send("Подмостовые габариты успешно добавлены!")
    }
    catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
      }
}

export const change = async (req, res) => {
    try{

        if(!req.body.site){
            throw new Error("Site is required!")
        }

        await GabsService.change(req.body);
        return res.send("Уровень успешно изменен!")
    }
    catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
      }
}

export const deleteById = async (req, res) => {
    try{

        if(!req.params.id){
            throw new Error("ID is required!")
        }

        await GabsService.deleteById(req.params.id);
        return res.end();
    }
    catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
      }
  
}

export const deleteByIdWithConfirm = async (req, res) => {
    try {
      if (!req.params.id) {
        throw new Error("Идентификатор уровня не предоставлен.");
      }
  
      await GabsService.deleteByIdWithConfirm(req.params.id);
      return res.end();
    } catch (error) {
      console.log(error);
      return res.status(400).send(error.message);
    }
  };

export const getAllByDate = async (req, res) => {
    try{

        if(!req.query.date){
            throw new Error("Date is required!")
        }

        let depths = await GabsService.getAllByDate(req.query.date);

        return res.send(depths);
    }
    catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
      }
  
}

export const getAllByPeriod = async (req, res) => {
    try{

        if (!req.query.startPeriod) {
            throw new Error("startPeriod is required!");
          }
      
          if (!req.query.endPeriod) {
            throw new Error("endPeriod is required!");
          }
      
        let depths = await GabsService.getAllByPeriod(req.query.startPeriod, req.query.endPeriod);

        return res.send(depths);
    }
    catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
      }
   
}

export const getAllByPeriodAndRiver = async (req, res) => {
    try{
        
        if (!req.query.startPeriod) {
            throw new Error("startPeriod is required!");
          }
      
          if (!req.query.endPeriod) {
            throw new Error("endPeriod is required!");
          }

        let depths = await GabsService.getAllByPeriodAndRiver(req.query.startPeriod, req.query.endPeriod, req.river);
        return res.send(depths);
    }
    catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
      }
   
}

export const getAllBySite = async (req, res) => {
    try{

    }
    catch (error) {
        console.log(error);
        return res.status(400).send(error.message);
      }
    let depths = await GabsService.getAllBySite(req.query.site);
    return res.send(depths);
}