import { LevelGu } from "../entities/LevelGu"
import { River } from "../entities/River"
import { AppDataSource } from "../data-source"
// import { hydronodesData } from "./levelsGuData"
import { Between } from 'typeorm';

const LevelsGuRepository = AppDataSource.getRepository(LevelGu)
const RiverRepository = AppDataSource.getRepository(River)

let hydronodesData = [
    {
        id: 1,
        hydronode: 'Судоходный г/у №1 Дубой',
        river: 'Пина',
        date: '—',
        level1: '—',
        level2: '—',
        level1Change: '—',
        level2Change: '—',
        coords: [52.079142, 25.774201]
    },
    {
        id: 2,
        hydronode: 'Судоходный г/у №2 Переруб',
        river: 'ДБК',
        date: '—',
        level1: '—',
        level2: '—',
        level1Change: '—',
        level2Change: '—',
        coords: [52.035181, 25.618088]
    }, 
    {
        id: 3,
        hydronode: 'Судоходный г/у №3 Рагодощ',
        river: 'ДБК',
        date: '—',
        level1: '—',
        level2: '—',
        level1Change: '—',
        level2Change: '—',
        coords: [52.023500, 25.472534]
    },
    {
        id: 4,
        hydronode: 'Судоходный г/у №4 Овзичи',
        river: 'ДБК',
        date: '—',
        level1: '—',
        level2: '—',
        level1Change: '—',
        level2Change: '—',
        coords: [52.022081, 25.328837]
    },
    {
        id: 5,
        hydronode: 'Судоходный г/у №5 Ляховичи',
        river: 'ДБК',
        date: '—',
        level1: '—',
        level2: '—',
        level1Change: '—',
        level2Change: '—',
        coords: [52.036990, 25.163390]
    },
    {
        id: 6,
        hydronode: 'Судоходный г/у Кобрин',
        river: 'ДБК',
        date: '—',
        level1: '—',
        level2: '—',
        level1Change: '—',
        level2Change: '—',
        coords: [52.212479, 24.399268]
    },
    {
        id: 7,
        hydronode: 'Судоходный г/у №8 Залузье',
        river: 'Мухавец',
        date: '—',
        level1: '—',
        level2: '—',
        level1Change: '—',
        level2Change: '—',
        coords: [52.191919, 24.128263]
    },
    {
        id: 8,
        hydronode: 'Судоходный г/у №9 Новосады',
        river: 'Мухавец',
        date: '—',
        level1: '—',
        level2: '—',
        level1Change: '—',
        level2Change: '—',
        coords: [52.141047, 23.953104]
    },
    {
        id: 9,
        hydronode: 'Судоходный г/у №10 Тришин',
        river: 'Мухавец',
        date: '—',
        level1: '—',
        level2: '—',
        level1Change: '—',
        level2Change: '—',
        coords: [52.088838, 23.743320]
    },
    {
        id: 10,
        hydronode: 'Судоходный г/у №11 Качановичи',
        river: 'Припять',
        date: '—',
        level1: '—',
        level2: '—',
        level1Change: '—',
        level2Change: '—',
        coords: [52.116139, 26.429919]
    },
    {
        id: 11,
        hydronode: 'Судоходный г/у №12 Стахово',
        river: 'Припять',
        date: '—',
        level1: '—',
        level2: '—',
        level1Change: '—',
        level2Change: '—',
        coords: [52.114592, 26.736549]
    },
    {
        id: 12,
        hydronode: 'Брест плотина',
        river: 'Мухавец',
        date: '—',
        level1: '—',
        level2: '—',
        level1Change: '—',
        level2Change: '—',
        coords: [52.083828006110416, 23.663883865425976]
    },
    {
        id: 13,
        hydronode: 'Судоходный шлюз Витебская ГЭС',
        river: 'Западная Двина',
        date: '—',
        level1: '—',
        level2: '—',
        level1Change: '—',
        level2Change: '—',
        coords: [55.249773, 30.160869]
    },
    {
        id: 14,
        hydronode: 'Гродненская ГЭС',
        river: 'Неман',
        date: '—',
        level1: '—',
        level2: '—',
        level1Change: '—',
        level2Change: '—',
        coords: [53.645261, 23.973409]
    },
    {
        id: 15,
        hydronode: 'Белорусская часть г/у Кужинец',
        river: 'Августовский канал',
        date: '—',
        level1: '—',
        level2: '—',
        level1Change: '—',
        level2Change: '—',
        coords: [53.860340, 23.528939]
    },
    {
        id: 16,
        hydronode: 'Судоходный г/у Волкушек',
        river: 'Августовский канал',
        date: '—',
        level1: '—',
        level2: '—',
        level1Change: '—',
        level2Change: '—',
        coords: [53.859118, 23.549525]
    },
    {
        id: 17,
        hydronode: 'Судоходный г/у Домбровка',
        river: 'Августовский канал',
        date: '—',
        level1: '—',
        level2: '—',
        level1Change: '—',
        level2Change: '—',
        coords: [53.862782, 23.624258]
    },
    {
        id: 18,
        hydronode: 'Судоходный г/у Немново',
        river: 'Августовский канал',
        date: '—',
        level1: '—',
        level2: '—',
        level1Change: '—',
        level2Change: '—',
        coords: [53.861766, 23.748762]
    },

]

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

    let rows = [];

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

    rows = hydronodesData.map((row) => {
        let rowData = levelsDto.filter((dat) => (dat.hydronode === row.hydronode));
        if (rowData.length === 0) return row;
        let lastRecord = rowData[0];
        rowData.forEach((dat) => { if (dat.date.getTime() > lastRecord.date.getTime()) lastRecord = dat; })
      
        return {
            ...lastRecord,
            date: lastRecord.date.toLocaleString().slice(0, 10)
        }
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