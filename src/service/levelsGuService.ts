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

export const getAllByDate = async (date) => {
    let hydronodes = hydronodesData;
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

    hydronodes = hydronodes.map((hydronode) => {
        let todayLevel = levels.find((level) => (level.hydronode === hydronode.hydronode));
        if (todayLevel !== undefined) {
            hydronode.level1 = todayLevel.level1;
            hydronode.level1 = todayLevel.level2;
            hydronode.date = todayLevel.date.toLocaleString();
        }
        return hydronode;
      })

    return hydronodes;
}

  export const add = async (level) => {
    let newLevel = new LevelGu();
    const currentDate = new Date(level.date);  
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59); 
    const river = await RiverRepository.findOneBy({ name: level.river });

    if (river === null) return;
    let levelsExist = await LevelsGuRepository.find(
        {
            where: {
                date: Between(startDate, endDate),
                hydronode: level.hydronode
            },
            relations: {
                river: true
            }
        }
    ); 
        
    if (levelsExist.length > 0) {
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
    await LevelsGuRepository.delete( { id: level.id } ); 
    return LevelsGuRepository.save(levelGu);
}

export const deleteById = async (id) => {
    return LevelsGuRepository.delete( { id: id } ); 
}