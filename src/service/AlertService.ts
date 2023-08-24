import { Alert } from "../entities/Alert";
import { River } from "../entities/River";
import { AppDataSource } from "../data-source";

const AlertRepository = AppDataSource.getRepository(Alert);
const RiverRepository = AppDataSource.getRepository(River);

export const getAll = async () => {
  let alerts = await AlertRepository.find({
    relations: {
      river: true,
    },
  });
  let alertsDto: any[] = [];
  alerts.map(async (alert) => {
    alertsDto.push({
      ...alert,
      river: alert.river.name,
    });
  });
  return alertsDto;
};

export const change = async (alert) => {
  let updatedAlert = new Alert();
  const river = await RiverRepository.findOneBy({ name: alert.river });
  updatedAlert = {
    ...alert,
    river: river,
  };
  return AlertRepository.save(updatedAlert);
};

export const add = async (alert) => {
    let newAlert = new Alert();
    const river = await RiverRepository.findOneBy({ name: alert.river });
    newAlert = {
        ...alert,
        river: river
    }
    return AlertRepository.save(newAlert);
}

export const deleteById = async (id) => {
    return AlertRepository.delete( { id: id } ); 
}