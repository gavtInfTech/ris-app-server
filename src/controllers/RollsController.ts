import * as RollsService from "../service/RollsService";

export const getAllRollsBySite = async(req, res) =>{
  try {
    if (!req.query.site) {
      throw new Error("Site is required!");
    }

    let rollsBySite = await RollsService.getAllRollsBySite(req.query.site);
    return res.send(rollsBySite);
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
}

// export const add = async (req, res) => {
//   try{

//       let depth = await RollsService.add(req.body);

//       if (depth === undefined) {
//           return res.status(405).send("Габариты судового хода на текующий день уже существуют!")
//       }
//       return res.send("Подмостовые габариты успешно добавлены!")
//   }
//   catch (error) {
//       console.log(error);
//       return res.status(400).send(error.message);
//     }
// }

// export const change = async (req, res) => {
//   try{

//       if(!req.body.site){
//           throw new Error("Site is required!")
//       }

//       await RollsService.change(req.body);
//       return res.send("Уровень успешно изменен!")
//   }
//   catch (error) {
//       console.log(error);
//       return res.status(400).send(error.message);
//     }
// }

// export const deleteById = async (req, res) => {
//   try{

//       if(!req.params.id){
//           throw new Error("ID is required!")
//       }

//       await RollsService.deleteById(req.params.id);
//       return res.end();
//   }
//   catch (error) {
//       console.log(error);
//       return res.status(400).send(error.message);
//     }

// }
