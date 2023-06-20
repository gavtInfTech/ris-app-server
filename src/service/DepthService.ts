import { Depth } from "../entities/Depth"
import { Site } from "../entities/Site"
import { AppDataSource } from "../data-source"
import { Between } from 'typeorm';

const DepthRepository = AppDataSource.getRepository(Depth)
const SiteRepository = AppDataSource.getRepository(Site)

export const getAll = async () => {
    let depths = await DepthRepository.find({
      relations: {
        site: true,
      },
    });
    let depthsDto: any[] = [];
    depths.map(async (depth) => {
        depthsDto.push(
            {
                ...depth,
                site: depth.site.name
            }
        )
    })
    return depthsDto;
  };

  export const getAllBySite = async (siteName) => {
    let site = await SiteRepository.findOneBy({ name: siteName });
    
    if (site === null) return;
    const depths = await DepthRepository
    .createQueryBuilder('depth')
    .leftJoinAndSelect('depth.site', 'site')
    .leftJoinAndSelect(`site.river`, 'river')
    .where(`site.id = :id`, { id: site.id })
    .getMany();

    let depthsDto: any[] = [];
    depths.map(async (depth) => {
        depthsDto.push(
            {
                ...depth,
                site: depth.site.name
            }
        )
    })

    return depthsDto;
  };

  export const getAllByDate = async (date) => {
    const currentDate = new Date(date);  
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);
    let depths = await DepthRepository.find(
        {
            where: {
                date: Between(startDate, endDate)
            },
            relations: [
                'site',
                'site.river'
            ],
        }
    ); 

    let bridgesDto: any[] = [];
    depths.map(async (depth) => {
        bridgesDto.push(
            {
                ...depth,
                site: depth.site.name
            }
        )
    })
    return bridgesDto;
}

export const add = async (depth) => {
    let newDepth = new Depth();
    const currentDate = new Date(depth.date);  
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59); 
    let site = await SiteRepository.findOneBy({ name: depth.site });

    if (site === null) return;
    const depthsExist = await DepthRepository.createQueryBuilder('depth')
    .leftJoin('depth.site', 'site')
    .where('depth.date BETWEEN :startDate AND :endDate', { startDate, endDate })
    .andWhere(`site.id = :id`, { id: site.id })
    .getMany();
        
    if (depthsExist.length > 0) {
        return undefined;
    }

    newDepth = {
        ...depth,
        site: site,
        date: currentDate,
        forecastDate:  depth.forecastDate !== null ? new Date(depth.forecastDate) : null
    }
    return DepthRepository.save(newDepth);
}

export const change = async (depth) => {
    let updatedDepth = new Depth();
    const site = await SiteRepository.findOneBy({ name: depth.site });
    updatedDepth = {
        ...depth,
        site: site,
        date: new Date(depth.date),
        forecastDate:  depth.forecastDate !== null ? new Date(depth.forecastDate) : null
    };
    return DepthRepository.save(updatedDepth);
}

export const deleteById = async (id) => {
    return DepthRepository.delete( { id: id } ); 
}