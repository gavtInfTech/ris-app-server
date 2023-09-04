import { Alert } from "../entities/Alert";
import { River } from "../entities/River";
import { AppDataSource } from "../data-source";
import { Between } from 'typeorm';

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

export const getAllByPeriodAndRiver = async (startPeriod, endPeriod, riverName) => {
  const startPeriodDate = new Date(startPeriod);  
  const endPeriodDate = new Date(endPeriod);
  const startDate = new Date(startPeriodDate.getFullYear(), startPeriodDate.getMonth(), startPeriodDate.getDate(), 0, 0, 0);
  const endDate = new Date(endPeriodDate.getFullYear(), endPeriodDate.getMonth(), endPeriodDate.getDate(), 23, 59, 59); 
  let alerts = await AlertRepository.find(
      {
          where: {
              date: Between(startDate, endDate)
          },
          relations: {
              river: true
          },
      }
  ); 

  alerts.filter((alert) => alert.river.name === riverName);

  let alertsDto: any[] = [];
  alerts.map(async (alert) => {
    alertsDto.push(
          {
              ...alert,
              river: alert.river.name
          }
      )
  })
  return alertsDto;
}

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
        river: river,
        date: new Date(alert.date)
    }
    return AlertRepository.save(newAlert);
}

export const deleteById = async (id) => {
    return AlertRepository.delete( { id: id } ); 
}