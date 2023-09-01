import { SiteAccordance } from "../entities/SiteAccordance";
import { River } from "../entities/River";
import { Site } from "../entities/Site";
import { AppDataSource } from "../data-source";
import { Between } from 'typeorm';

const AccordanceRepository = AppDataSource.getRepository(SiteAccordance);
const RiverRepository = AppDataSource.getRepository(River);
const SiteRepository = AppDataSource.getRepository(Site);

export const add = async (siteAccordance) => {
    let newSiteAccordance = new SiteAccordance();
    const site = await SiteRepository.findOneBy({ name: siteAccordance.site });
    newSiteAccordance = {
        ...siteAccordance,
        site: site,
        date: new Date(siteAccordance.date)
    }
    return AccordanceRepository.save(newSiteAccordance);
}

export const getAllByPeriodAndRiver = async (startPeriod, endPeriod, river) => {
    const startPeriodDate = new Date(startPeriod);  
    const endPeriodDate = new Date(endPeriod);
    const startDate = new Date(startPeriodDate.getFullYear(), startPeriodDate.getMonth(), startPeriodDate.getDate(), 0, 0, 0);
    const endDate = new Date(endPeriodDate.getFullYear(), endPeriodDate.getMonth(), endPeriodDate.getDate(), 23, 59, 59); 
    let accordances = await AccordanceRepository.find(
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

    accordances = accordances.filter(item => item.site.river.name === river);
    let accordancesDto: any[] = [];
    accordances.map(async (accordance) => {
        accordancesDto.push({
        ...accordance,
        site: accordance.site.name,
        });
    });
    return accordancesDto;
}