import { BridgeGab } from "../entities/BridgeGab"
import { River } from "../entities/River"
import { AppDataSource } from "../data-source"
import { Between } from 'typeorm';
import moment from 'moment-timezone';

const BridgeRepository = AppDataSource.getRepository(BridgeGab)
const RiverRepository = AppDataSource.getRepository(River)

export const getAll = async () => {
    let bridges = await BridgeRepository.find({
      relations: {
        river: true,
      },
    });
    let bridgesDto: any[] = [];
    bridges.map(async (bridge) => {
        bridgesDto.push(
            {
                ...bridge,
                river: bridge.river.name
            }
        )
    })
    return bridgesDto;
  };

  export const getAllByBridge = async (bridge) => {
    let bridges = await BridgeRepository.find({
        where: {
            bridge: bridge
        },
        relations: {
            river: true,
        },
    });

    let bridgesDto: any[] = [];
    bridges.forEach(async (bridge) => {
        bridgesDto.push({
        ...bridge,
        river: bridge.river.name,
        })

    })

    return bridgesDto;
  };

export const add = async (bridge) => {
    let flag = false;
    let newBridge = new BridgeGab();
    const currentDate = new Date(bridge.date);  
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59); 

    let bridgesExist = await BridgeRepository.find(
        { 
            where: {
                date: Between(startDate, endDate),
                bridge: bridge.bridge
            }
        }
    );
        
    if (bridgesExist.length > 0) {
        flag = true;
        return undefined;
    }

    const river = await RiverRepository.findOneBy({ name: bridge.river });
    newBridge = {
        ...bridge,
        river: river,
        date: currentDate
    }
    return BridgeRepository.save(newBridge);
}

export const change = async (bridge) => {
    const river = await RiverRepository.findOneBy({ name: bridge.river });
    let changedBridge = {
        ...bridge,
        river: river,
        date: new Date(bridge.date)
    };
    await BridgeRepository.delete( { id: bridge.id } ); 
    return BridgeRepository.save(changedBridge);
}

export const deleteById = async (id) => {
    return BridgeRepository.delete( { id: id } ); 
}

export const getAllByDate = async (date) => {
    const currentDate = new Date(date);  
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0); // Начало текущего дня
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59); // Конец текущего дня
    let bridges = await BridgeRepository.find(
        {
            where: {
                date: Between(startDate, endDate)
            },
            relations: {
                river: true,
            },
        }
    ); 

    let bridgesDto: any[] = [];
    bridges.map(async (bridge) => {
        bridgesDto.push(
            {
                ...bridge,
                river: bridge.river.name
            }
        )
    })
    return bridgesDto;
}