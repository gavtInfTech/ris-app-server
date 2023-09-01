import { Gab } from "../entities/Gab"
import { Site } from "../entities/Site"
import { AppDataSource } from "../data-source"
import { Between } from 'typeorm';

const GabRepository = AppDataSource.getRepository(Gab)
const SiteRepository = AppDataSource.getRepository(Site)

export const getAll = async () => {
    let gabs = await GabRepository.find({
      relations: {
        site: true,
      },
    });
    let gabsDto: any[] = [];
    gabs.map(async (gab) => {
        gabsDto.push(
            {
                ...gab,
                site: gab.site.name
            }
        )
    })
    return gabsDto;
  };

  export const getAllBySite = async (siteName) => {
    let site = await SiteRepository.findOneBy({ name: siteName });
    
    if (site === null) return;
    // const gabs = await GabRepository
    // .createQueryBuilder('gab')
    // .leftJoinAndSelect('gab.site', 'site')
    // .leftJoinAndSelect(`site.river`, 'river')
    // .where(`site.id = :id`, { id: site.id })
    // .getMany();

    let gabs = await GabRepository.find({
        where: { 
            site: site 
        },
        relations: {
            site: true
        } 
    });

    let gabsDto: any[] = [];
    gabs.map(async (gab) => {
        gabsDto.push(
            {
                ...gab,
                site: gab.site.name
            }
        )
    })

    return gabsDto;
  };

  export const getAllByDate = async (date) => {
    const currentDate = new Date(date);  
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);
    let gabs = await GabRepository.find(
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

    let gabsDto: any[] = [];
    gabs.map(async (gab) => {
        gabsDto.push(
            {
                ...gab,
                site: gab.site.name,
                river: gab.site.river.name
            }
        )
    })
    return gabsDto;
}

export const getAllByPeriod = async (startPeriod, endPeriod) => {
    const startPeriodDate = new Date(startPeriod);  
    const endPeriodDate = new Date(endPeriod);
    const startDate = new Date(startPeriodDate.getFullYear(), startPeriodDate.getMonth(), startPeriodDate.getDate(), 0, 0, 0);
    const endDate = new Date(endPeriodDate.getFullYear(), endPeriodDate.getMonth(), endPeriodDate.getDate(), 23, 59, 59); 
    let gabs = await GabRepository.find(
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

    let gabsDto: any[] = [];
    gabs.map(async (gab) => {
        gabsDto.push(
            {
                ...gab,
                site: gab.site.name,
                river: gab.site.river.name
            }
        )
    })
    return gabsDto;
}

export const getAllByPeriodAndRiver = async (startPeriod, endPeriod, riverName) => {
    const startPeriodDate = new Date(startPeriod);  
    const endPeriodDate = new Date(endPeriod);
    const startDate = new Date(startPeriodDate.getFullYear(), startPeriodDate.getMonth(), startPeriodDate.getDate(), 0, 0, 0);
    const endDate = new Date(endPeriodDate.getFullYear(), endPeriodDate.getMonth(), endPeriodDate.getDate(), 23, 59, 59); 
    let gabs = await GabRepository.find(
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

    gabs.filter((gab) => gab.site.river.name === riverName);

    let gabsDto: any[] = [];
    gabs.map(async (gab) => {
        gabsDto.push(
            {
                ...gab,
                site: gab.site.name,
                river: gab.site.river.name
            }
        )
    })
    return gabsDto;
}

export const add = async (gab) => {
    let newGab = new Gab();
    const currentDate = new Date(gab.date);  
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59); 
    let site = await SiteRepository.findOneBy({ name: gab.site });
    if (site === null) return;

    const GabsExist = await GabRepository.createQueryBuilder('gab')
    .leftJoin('gab.site', 'site')
    .where('gab.date BETWEEN :startDate AND :endDate', { startDate, endDate })
    .andWhere(`site.id = :id`, { id: site.id })
    .getMany();
        
    if (GabsExist.length > 0) {
        return undefined;
    }

    newGab = {
        ...gab,
        site: site,
        date: currentDate,
        forecastDate:  gab.forecastDate !== null ? new Date(gab.forecastDate) : null
    }
    return GabRepository.save(newGab);
}

export const change = async (gab) => {
    let updatedGab = new Gab();
    const site = await SiteRepository.findOneBy({ name: gab.site });
    updatedGab = {
        ...gab,
        site: site,
        date: new Date(gab.date),
        forecastDate:  gab.forecastDate !== null ? new Date(gab.forecastDate) : null
    };
    return GabRepository.save(updatedGab);
}

export const deleteById = async (id) => {
    return GabRepository.delete( { id: id } ); 
}