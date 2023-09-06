import { Rift } from "../entities/Rift";
import { River } from "../entities/River";
import { AppDataSource } from "../data-source";

const RiftRepository = AppDataSource.getRepository(Rift);
const RiverRepository = AppDataSource.getRepository(River);

export const getAll = async () => {
  let rifts = await RiftRepository.find({
    relations: {
      river: true,
    },
  });
  let riftsDto: any[] = [];
  rifts.map(async (rift) => {
    riftsDto.push({
      ...rift,
      river: rift.river.name,
    });
  });
  return riftsDto;
};

export const change = async (rift) => {
  let updatedRift = new Rift();
  const river = await RiverRepository.findOneBy({ name: rift.river });
  updatedRift = {
    ...rift,
    river: river,
  };
  return RiftRepository.save(updatedRift);
};

export const save = async () => {
  let rifts: any = [
    
  ];

  let river = new River();
  river.id = '2';
  rifts.forEach(async (rift) => {
    let riftObj = new Rift();
    riftObj = {
      ...rift,
      river: river,
    };
    await RiftRepository.save(riftObj);
  });
};


export const deleteByRiver = async (riverId: string) => {
 

  try {
    let river = new River();
    river.id = riverId;
    const riftsToDelete = await RiftRepository.find({ where: { river } });
    await RiftRepository.remove(riftsToDelete);
  } catch (error) {
    console.error("Error:", error);
  }
};