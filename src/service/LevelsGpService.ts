import { LevelGp } from "../entities/LevelGp"
import { River } from "../entities/River"
import { AppDataSource } from "../data-source"
import { hydropostsData } from "./LevelsGpData"

const LevelGpRepository = AppDataSource.getRepository(LevelGp)
const RiverRepository = AppDataSource.getRepository(River)

export const getAll =  async () => {
    let levels = await LevelGpRepository.find(
        {
            relations: {
                river: true,
            },
        }
    ); 
    let levelsDto = [];
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

export const add = async (level) => {
    let newLevel = new LevelGp();
    let date = new Date(level.date);
    let levelsExist = await LevelGpRepository.find(
        {
            where: {
                date: date
            },
            relations: {
                river: true,
            },
        }
    );
    if (levelsExist.find((levelExist) => levelExist.hydropost === level.hydropost)) return undefined;
    const river = await RiverRepository.findOneBy({ name: level.river });
    newLevel = {
        ...level,
        river: river
    }

    return LevelGpRepository.save(newLevel);
}

export const change = async (level) => {
    let levelGp = new LevelGp();
    let river = new River();
    river = await RiverRepository.findOneBy({ name: level.river })
    levelGp = {
        ...level,
        river: river
    }
    return LevelGpRepository.update(levelGp.id, levelGp);
}

export const deleteById = async (id) => {
    return LevelGpRepository.delete(id); 
}

export const getLevelsByDate = async (date) => {
    let hydroposts = hydropostsData;

    let levels = await LevelGpRepository.find(
        {
            relations: {
                river: true,
            },
        }
    ); 

    hydroposts = hydroposts.map((hydropost) => {
        let todayLevel = levels.find((level) => (level.hydropost === hydropost.hydropost && date.toLocaleString().slice(0, 10) === level.date.toLocaleString().slice(0, 10)));
        if (todayLevel !== undefined) {
            hydropost.level1 = todayLevel.level1;
            hydropost.level1 = todayLevel.level2;
            hydropost.date = todayLevel.date.toLocaleString().slice(0, 10);
            hydropost.difference = todayLevel.difference;
        }
        return hydropost;
      })

    return hydroposts;
}

export const getAllByHydropost = async (hydropost) => {
    let levels = await LevelGpRepository.find(
        {
            where: {
                hydropost: hydropost
            },
            relations: {
                river: true,
            },
        }
    ); 
    let levelsDto = [];
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