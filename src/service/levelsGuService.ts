import { LevelGu } from "../entities/LevelGu"
import { River } from "../entities/River"
import { AppDataSource } from "../data-source"
import { hydronodesData } from "./levelsGuData"
import { Between } from 'typeorm';

const LevelsGuRepository = AppDataSource.getRepository(LevelGu)
const RiverRepository = AppDataSource.getRepository(River)

export const getAll = async () => {
    let levels = await LevelsGuRepository.find({
      relations: {
        river: true,
      },
    });
    let levelsDto: any[] = [];
    levels.map(async (level) => {
        levelsDto.push(
            {
                ...level,
                river: level.river.name
            }
        )
    })
    return levelsDto;
  };

  export const getAllByHydronode = async (hydronode) => {

    let levels = await LevelsGuRepository.find(
        {
            where: {
                hydronode: hydronode
            },
            relations: {
                river: true,
            },
        }
    ); 
    let levelsDto: any = [];
    levels.map(async (level) => {
        levelsDto.push(
            {
                ...level,
                river: level.river.name
            }
        )
    })

    return levelsDto;
}

export const getLastLevels = async () => {

    let rows = hydronodesData;

    let levels = await LevelsGuRepository.find(
        {
            relations: {
                river: true,
            }
        }
    ); 

    let levelsDto: any = [];
    levels.map((level) => {
        levelsDto.push(
            {
                ...level,
                river: level.river.name
            }
        )
    })

    rows = rows.map((row) => {
        let rowData = levelsDto.filter((dat) => (dat.hydronode === row.hydronode));
        if (rowData.length === 0) return row;
        let lastRecord = rowData[0];
        rowData.forEach((dat) => { if (dat.date.getTime() > lastRecord.date.getTime()) lastRecord = dat; })
        row.level1 = lastRecord.level1;
        row.level2 = lastRecord.level2;
        row.level1Change = lastRecord.level1Change;
        row.level2Change = lastRecord.level2Change;
        row.date = lastRecord.date.toLocaleString().slice(0, 10);
        row.river = lastRecord.river;
        return row;
      })

    return rows;
}

export const getAllByDate = async (date) => {
    const currentDate = new Date(date);  
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);
    let levels = await LevelsGuRepository.find(
        {
            where: {
                date: Between(startDate, endDate)
            },
            relations: {
                river: true
            }
        }
    ); 

    let levelsDto: any = [];
    levels.map((level) => {
        levelsDto.push(
            {
                ...level,
                river: level.river.name
            }
        )
    })
    return levelsDto;
}

export const getAllByPeriod = async (startPeriod, endPeriod) => {
    const startPeriodDate = new Date(startPeriod);  
    const endPeriodDate = new Date(endPeriod);
    const startDate = new Date(startPeriodDate.getFullYear(), startPeriodDate.getMonth(), startPeriodDate.getDate(), 0, 0, 0);
    const endDate = new Date(endPeriodDate.getFullYear(), endPeriodDate.getMonth(), endPeriodDate.getDate(), 23, 59, 59);
    let levels = await LevelsGuRepository.find(
        {
            where: {
                date: Between(startDate, endDate)
            },
            relations: {
                river: true
            }
        }
    ); 

    let levelsDto: any = [];
    levels.map((level) => {
        levelsDto.push(
            {
                ...level,
                river: level.river.name
            }
        )
    })
    return levelsDto;
}

  export const add = async (level) => {
    let newLevel = new LevelGu();
    const currentDate = new Date(level.date);  
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59); 
    const river = await RiverRepository.findOneBy({ name: level.river });

    if (river === null) return;
    let levelsExist = await LevelsGuRepository.findOne(
        {
            where: {
                date: Between(startDate, endDate),
                hydronode: level.hydronode
            }
        }
    ); 
        
    if (levelsExist) {
        return undefined;
    }

    newLevel = {
            ...level,
            river: river,
            date: new Date(level.date)
        }
    return LevelsGuRepository.save(newLevel);
}

export const change = async (level) => {
    let levelGu = new LevelGu();
    const river = await RiverRepository.findOneBy({ name: level.river });
    levelGu = {
        ...level,
        river: river,
        date: new Date(level.date)
    };
    return LevelsGuRepository.save(levelGu);
}

export const deleteById = async (id) => {
    return LevelsGuRepository.delete( { id: id } ); 
}