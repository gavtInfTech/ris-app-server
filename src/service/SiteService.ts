import { Site } from "../entities/Site";
import { River } from "../entities/River";
import { AppDataSource } from "../data-source";

const SiteRepository = AppDataSource.getRepository(Site);
const RiverRepository = AppDataSource.getRepository(River);

export const getAll = async () => {
  let sites = await SiteRepository.find({
    relations: {
      river: true,
    },
  });
  let sitesDto: any[] = [];
  sites.map(async (site) => {
    sitesDto.push({
      ...site,
      river: site.river.name,
    });
  });
  return sitesDto;
};

export const change = async (site) => {
  let updatedSite = new Site();
  const river = await RiverRepository.findOneBy({ name: site.river });
  updatedSite = {
    ...site,
    river: river,
  };
  return SiteRepository.save(updatedSite);
};

export const add = async (site) => {
    let newSite = new Site();
    const river = await RiverRepository.findOneBy({ name: site.river });
    newSite = {
        ...site,
        river: river
    }
    return SiteRepository.save(newSite);
}

export const deleteById = async (id) => {
    return SiteRepository.delete( { id: id } ); 
}