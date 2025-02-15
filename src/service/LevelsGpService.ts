import { LevelGp } from "../entities/LevelGp";
import { River } from "../entities/River";
import { AppDataSource } from "../data-source";
import { hydropostsData } from "./LevelsGpData";
import { Between } from "typeorm";

const LevelGpRepository = AppDataSource.getRepository(LevelGp);
const RiverRepository = AppDataSource.getRepository(River);

export const getAll = async () => {
  let levels = await LevelGpRepository.find({
    relations: {
      river: true,
    },
  });
  let levelsDto: any = [];
  levels.map(async (level) => {
    levelsDto.push({
      ...level,
      river: level.river.name,
    });
  });
  return levelsDto;
};

export const getAllByHydropost = async (hydropost) => {
  let levels = await LevelGpRepository.find({
    where: {
      hydropost: hydropost,
    },
    relations: {
      river: true,
    },
  });
  let levelsDto: any[] = [];
  levels.map((level) => {
    levelsDto.push({
      ...level,
      river: level.river.name,
    });
  });
  return levelsDto;
};

export const getAllByDate = async (date) => {
  const currentDate = new Date(date);
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    0,
    0,
    0
  );
  const endDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    23,
    59,
    59
  );
  let levels = await LevelGpRepository.find({
    where: {
      date: Between(startDate, endDate),
    },
    relations: {
      river: true,
    },
  });
  let levelsDto: any[] = [];
  levels.map((level) => {
    levelsDto.push({
      ...level,
      river: level.river.name,
    });
  });
  return levelsDto;
};

export const getAllByPeriod = async (startPeriod, endPeriod) => {
  const startPeriodDate = new Date(startPeriod);
  const endPeriodDate = new Date(endPeriod);
  const startDate = new Date(
    startPeriodDate.getFullYear(),
    startPeriodDate.getMonth(),
    startPeriodDate.getDate(),
    0,
    0,
    0
  );
  const endDate = new Date(
    endPeriodDate.getFullYear(),
    endPeriodDate.getMonth(),
    endPeriodDate.getDate(),
    23,
    59,
    59
  );
  let levels = await LevelGpRepository.find({
    where: {
      date: Between(startDate, endDate),
    },
    relations: {
      river: true,
    },
  });
  let levelsDto: any[] = [];
  levels.map((level) => {
    levelsDto.push({
      ...level,
      river: level.river.name,
    });
  });
  return levelsDto;
};

export const getAllByPeriodAndRiver = async (
  startPeriod,
  endPeriod,
  riverName
) => {
  const startPeriodDate = new Date(startPeriod);
  const endPeriodDate = new Date(endPeriod);
  const startDate = new Date(
    startPeriodDate.getFullYear(),
    startPeriodDate.getMonth(),
    startPeriodDate.getDate(),
    0,
    0,
    0
  );
  const endDate = new Date(
    endPeriodDate.getFullYear(),
    endPeriodDate.getMonth(),
    endPeriodDate.getDate(),
    23,
    59,
    59
  );
  let river = new River();
  river.name = riverName;
  let levels: any = [];
  if (riverName === "Припять1" || riverName === "Припять2") {
    river.name = "Припять";
    levels = await LevelGpRepository.find({
      where: {
        date: Between(startDate, endDate),
        river: river,
      },
      relations: {
        river: true,
      },
    });
    if (riverName === "Припять1") {
      levels = levels.filter(
        (level) =>
          (level.hydropost === "Петриков" ||
          level.hydropost === "Черничи" ||
          level.hydropost === "Наровля" ||
          level.hydropost === "Мозырь")
      );
    } else {
      levels = levels.filter(
        (level) => (level.hydropost === "Пинск" || level.hydropost === "Коробье")
      );
    }
  } else {
    levels = await LevelGpRepository.find({
      where: {
        date: Between(startDate, endDate),
        river: river,
      },
      relations: {
        river: true,
      },
    });
  }

  let levelsDto: any[] = [];
  levels.map((level) => {
    levelsDto.push({
      ...level,
      river: level.river.name,
    });
  });
  return levelsDto;
};

export const add = async (level) => {
  let newLevel = new LevelGp();
  const currentDate = new Date(level.date);
  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    0,
    0,
    0
  );
  const endDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate(),
    23,
    59,
    59
  );
  const river = await RiverRepository.findOneBy({ name: level.river });

  if (river === null) return;
  let levelsExist = await LevelGpRepository.find({
    where: {
      date: Between(startDate, endDate),
      hydropost: level.hydropost,
    },
  });

  if (levelsExist.length > 0) {
    return undefined;
  }

  newLevel = {
    ...level,
    river: river,
    date: new Date(level.date),
  };
  return LevelGpRepository.save(newLevel);
};

export const change = async (level) => {
  let levelGp = new LevelGp();
  let river = await RiverRepository.findOneBy({ name: level.river });
  if (level.id.includes("_change") && level.confirmation){
      await LevelGpRepository.delete({ id: level.id }); 
      level.id = level.id.replace(/_change$/, '');
  }
  levelGp = {
    ...level,
    river: river,
    date: new Date(level.date),
  };
  return LevelGpRepository.save(levelGp);
};

export const deleteById = async (id) => {
  return LevelGpRepository.delete({ id: id });
};

export const deleteByIdWithConfirm = async (id) => {
  try {
    // Find the LevelGp record by id
    const levelGpToUpdate = await LevelGpRepository.findOne(
      {
        where: {
          id: id
        },
      }
    );

    // Check if the record exists
    if (levelGpToUpdate) {
      // Update the status field to "Удалено"
      levelGpToUpdate.typeOfChange = 'Удалено';
      levelGpToUpdate.confirmation = false;
      // Save the updated record
      await LevelGpRepository.save(levelGpToUpdate);

      // Return the updated record
      return levelGpToUpdate;
    } else {
      // If the record with the provided id is not found, you can throw an error or handle it as needed.
      throw new Error(`LevelGp record with id ${id} not found.`);
    }
  } catch (error) {
    // Handle errors, log them, or throw them as needed
    console.error('Error deleting LevelGp record:', error);
    throw error;
  }
};
