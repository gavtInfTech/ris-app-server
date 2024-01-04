import { River } from "../entities/River";
import { Dislocation } from "../entities/Dislocation"
import { Gab } from "../entities/Gab"
import { LevelGp } from "../entities/LevelGp";
import { LevelGu } from "../entities/LevelGu"
import { BridgeGab } from "../entities/BridgeGab"

import { AppDataSource } from "../data-source";
import { Between } from 'typeorm';

const RiverRepository = AppDataSource.getRepository(River);
const DislocationRepository = AppDataSource.getRepository(Dislocation);
const GabRepository = AppDataSource.getRepository(Gab);
const LevelGpRepository = AppDataSource.getRepository(LevelGp);
const LevelGuRepository = AppDataSource.getRepository(LevelGu);
const BridgeGabRepository = AppDataSource.getRepository(BridgeGab);

export const getAllUnconfirmedData = async () => {
    try {
        const [dislocations, gabs, levelGps, levelGus, bridgeGabs] = await Promise.all([
          DislocationRepository.find({ where: { confirmation: false } }),
          GabRepository.find({ where: { confirmation: false } }),
          LevelGpRepository.find({ where: { confirmation: false } }),
          LevelGuRepository.find({ where: { confirmation: false } }),
          BridgeGabRepository.find({ where: { confirmation: false } }),
        ]);
      
        // Filter out the arrays that are empty
        const nonEmptyArrays = [
          { name: 'dislocations', data: dislocations },
          { name: 'gabs', data: gabs },
          { name: 'levelGps', data: levelGps },
          { name: 'levelGus', data: levelGus },
          { name: 'bridgeGabs', data: bridgeGabs },
        ].filter(({ data }) => data.length > 0);
      
        // Check if there are non-empty arrays
        if (nonEmptyArrays.length === 0) {
          console.warn("All arrays are empty");
          // You can handle this case, e.g., return null, throw an error, or provide default values
          return null;
        }
      
        // Create an object with non-empty arrays
        const result = {};
        nonEmptyArrays.forEach(({ name, data }) => {
          result[name] = data;
        });
      
        return result;
      } catch (error) {
        console.error("Error fetching unconfirmed data:", error);
        throw error;
      }
      
  };
  


export const confirmAdd = async (id) => {
    try {
        const [dislocations, gabs, levelGps, levelGus, bridgeGabs] = await Promise.all([
          DislocationRepository.find({ where: { confirmation: false, typeOfChange: "Добавлено" } }),
          GabRepository.find({ where: { confirmation: false, typeOfChange: "Добавлено" } }),
          LevelGpRepository.find({ where: { confirmation: false, typeOfChange: "Добавлено" } }),
          LevelGuRepository.find({ where: { confirmation: false, typeOfChange: "Добавлено" } }),
          BridgeGabRepository.find({ where: { confirmation: false, typeOfChange: "Добавлено" } }),
        ]);
      
        // Filter out the arrays that are empty
        const nonEmptyArrays = [
          { name: 'dislocations', data: dislocations },
          { name: 'gabs', data: gabs },
          { name: 'levelGps', data: levelGps },
          { name: 'levelGus', data: levelGus },
          { name: 'bridgeGabs', data: bridgeGabs },
        ].filter(({ data }) => data.length > 0);
      
        // Check if there are non-empty arrays
        if (nonEmptyArrays.length === 0) {
          console.warn("All arrays are empty");
          // You can handle this case, e.g., return null, throw an error, or provide default values
          return null;
        }
      
        // Create an object with non-empty arrays
        const result = {};
        nonEmptyArrays.forEach(({ name, data }) => {
          result[name] = data;
        });
      
        return result;
      } catch (error) {
        console.error("Error fetching unconfirmed data:", error);
        throw error;
      }      
};
export const confirmChange = async (alert) => {
    try {
        const [dislocations, gabs, levelGps, levelGus, bridgeGabs] = await Promise.all([
          DislocationRepository.find({ where: { confirmation: false, typeOfChange: "Изменено" } }),
          GabRepository.find({ where: { confirmation: false, typeOfChange: "Изменено" } }),
          LevelGpRepository.find({ where: { confirmation: false, typeOfChange: "Изменено" } }),
          LevelGuRepository.find({ where: { confirmation: false, typeOfChange: "Изменено" } }),
          BridgeGabRepository.find({ where: { confirmation: false, typeOfChange: "Изменено" } }),
        ]);
      
        // Filter out the arrays that are empty
        const nonEmptyArrays = [
          { name: 'dislocations', data: dislocations },
          { name: 'gabs', data: gabs },
          { name: 'levelGps', data: levelGps },
          { name: 'levelGus', data: levelGus },
          { name: 'bridgeGabs', data: bridgeGabs },
        ].filter(({ data }) => data.length > 0);
      
        // Check if there are non-empty arrays
        if (nonEmptyArrays.length === 0) {
          console.warn("All arrays are empty");
          // You can handle this case, e.g., return null, throw an error, or provide default values
          return null;
        }
      
        // Create an object with non-empty arrays
        const result = {};
        nonEmptyArrays.forEach(({ name, data }) => {
          result[name] = data;
        });
      
        return result;
      } catch (error) {
        console.error("Error fetching unconfirmed data:", error);
        throw error;
      }  
  };

  export const confirmDelete = async (alert) => {
    try {
        const [dislocations, gabs, levelGps, levelGus, bridgeGabs] = await Promise.all([
          DislocationRepository.find({ where: { confirmation: false, typeOfChange: "Изменено" } }),
          GabRepository.find({ where: { confirmation: false, typeOfChange: "Изменено" } }),
          LevelGpRepository.find({ where: { confirmation: false, typeOfChange: "Изменено" } }),
          LevelGuRepository.find({ where: { confirmation: false, typeOfChange: "Изменено" } }),
          BridgeGabRepository.find({ where: { confirmation: false, typeOfChange: "Изменено" } }),
        ]);
      
        // Filter out the arrays that are empty
        const nonEmptyArrays = [
          { name: 'dislocations', data: dislocations },
          { name: 'gabs', data: gabs },
          { name: 'levelGps', data: levelGps },
          { name: 'levelGus', data: levelGus },
          { name: 'bridgeGabs', data: bridgeGabs },
        ].filter(({ data }) => data.length > 0);
      
        // Check if there are non-empty arrays
        if (nonEmptyArrays.length === 0) {
          console.warn("All arrays are empty");
          // You can handle this case, e.g., return null, throw an error, or provide default values
          return null;
        }
      
        // Create an object with non-empty arrays
        const result = {};
        nonEmptyArrays.forEach(({ name, data }) => {
          result[name] = data;
        });
      
        return result;
      } catch (error) {
        console.error("Error fetching unconfirmed data:", error);
        throw error;
      }  
  };
  

export const reject = async (id) => {
    return "No!"
}