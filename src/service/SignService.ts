import { Sign } from "../entities/Sign";
import { River } from "../entities/River";
import { AppDataSource } from "../data-source";

const SignRepository = AppDataSource.getRepository(Sign);
const RiverRepository = AppDataSource.getRepository(River);

export const getAll = async () => {
  let signs = await SignRepository.find({
    relations: {
      river: true,
    },
  });
  let signsDto: any[] = [];
  signs.map(async (sign) => {
    signsDto.push({
      ...sign,
      river: sign.river.name,
    });
  });
  return signsDto;
};

export const change = async (sign) => {
  let updatedSign = new Sign();
  const river = await RiverRepository.findOneBy({ name: sign.river });
  updatedSign = {
    ...sign,
    river: river,
  };
  return SignRepository.save(updatedSign);
};

export const save = async () => {
  let signs = [
    
  ];

  let river = new River();
  river.id = '4';
  signs.forEach(async (sign) => {
    let signObj = new Sign();
    signObj = {
      ...sign,
      river: river,
    };
    await SignRepository.save(signObj);
  });
};


export const deleteByRiver = async (riverId: string) => {
 

  try {
    let river = new River();
    river.id = riverId;
    const signsToDelete = await SignRepository.find({ where: { river } });
    await SignRepository.remove(signsToDelete);
  } catch (error) {
    console.error("Error deleting signs:", error);
  }
};