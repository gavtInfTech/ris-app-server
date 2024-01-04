import { Marshrutnik } from "../entities/Marshrutnik";
import { AppDataSource } from "../data-source";
import { River } from "../entities/River";

const MarshrutnikRepository = AppDataSource.getRepository(Marshrutnik);

const RiverRepository = AppDataSource.getRepository(River);

export const add = async (newMarshrutnik) => {
  const { code_riv, ...rest } = newMarshrutnik;

  // Fetch the associated River entity using code_riv
  const river = await RiverRepository.findOne({
    where: {
      name: code_riv,
    },
  });

  if (!river) {
    throw new Error("River not found"); // Handle the case when the river is not found
  }

  const marshrutnik = new Marshrutnik();
  marshrutnik.river = river;
  Object.assign(marshrutnik, rest);

  return MarshrutnikRepository.save(marshrutnik);
};

export const change = async (clientUpdated) => {
  const { code_riv, ...rest } = clientUpdated;

  // Fetch the associated River entity using code_riv
  const river = await RiverRepository.findOne({
    where: {
      name: code_riv,
    },
  });

  if (!river) {
    throw new Error("River not found"); // Handle the case when the river is not found
  }

  const marshrutnik = new Marshrutnik();
  marshrutnik.river = river;
  Object.assign(marshrutnik, rest);

  return MarshrutnikRepository.save(marshrutnik);
}

export const getAll = async () => {
  const marshrutnikRepository = AppDataSource.getRepository(Marshrutnik);

  // Use relations option to include the 'river' property in the result
  let marshrutnik = await marshrutnikRepository.find({ relations: ["river"] });

  return marshrutnik;
};
export const findByName = (name) => {
  return MarshrutnikRepository.findOne({
    where: {
      name: name,
    },
  });
};

export const deleteById = (id) => {
  return MarshrutnikRepository.delete(id);
};

