import { Bridge } from "../entities/Bridge"
import { River } from "../entities/River"
import { AppDataSource } from "../data-source"
import { hydronodesData } from "./levelsGuData"

const BridgeRepository = AppDataSource.getRepository(Bridge)
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
            name: bridge
        },
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

export const add = async (bridge) => {
    let newBridge = new Bridge();
    let date = new Date(bridge.date);
    let bridgesExist = await BridgeRepository.find(
        {
            where: {
                date: date
            },
        }
    );
    bridgesExist.forEach((bridgeExist) => {
        if (bridgeExist.name === bridge.name) {
            return undefined; 
        }
    })
    const river = await RiverRepository.findOneBy({ name: bridge.river });
    newBridge = {
        ...bridge,
        river: river
    }

    return BridgeRepository.save(newBridge);
}

export const change = async (bridge) => {
    const river = await RiverRepository.findOneBy({ name: bridge.river });
    let changedBridge = {
        ...bridge,
        river: river,
    };
    return BridgeRepository.update(bridge.id, changedBridge);
}

export const deleteById = async (id) => {
    return BridgeRepository.delete(id); 
}

export const getAllByDate = async (date) => {

    let bridges = await BridgeRepository.find(
        {
            where: {
                date: new Date(date)
            },
            relations: {
                river: true,
            },
        }
    ); 

    return bridges;
}