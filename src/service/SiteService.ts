import { Site } from "../entities/Site";
import { River } from "../entities/River";
import { Organisation } from "../entities/Organisation";
import { AppDataSource } from "../data-source";

const SiteRepository = AppDataSource.getRepository(Site);
const RiverRepository = AppDataSource.getRepository(River);
const OrganisationRepository = AppDataSource.getRepository(Organisation);

export const getAll = async () => {
  let sites = await SiteRepository.find({
    relations: [
      'river',
      'organisation'
    ],
  });
  let sitesDto: any[] = [];
  sites.map(async (site) => {
    sitesDto.push({
      ...site,
      river: site.river.name,
      organisation: site.organisation.name
    });
  });
  return sitesDto;
};

export const change = async (site) => {
  let updatedSite = new Site();
  const river = await RiverRepository.findOneBy({ name: site.river });
  const organisation = await OrganisationRepository.findOneBy({ name: site.organisation });
  updatedSite = {
    ...site,
    river: river,
    organisation: organisation
  };
  return SiteRepository.save(updatedSite);
};

export const add = async (site) => {
    let newSite = new Site();
    const river = await RiverRepository.findOneBy({ name: site.river });
    const organisation = await OrganisationRepository.findOneBy({ name: site.organisation });
    newSite = {
        ...site,
        river: river,
        organisation: organisation
    }
    return SiteRepository.save(newSite);
}

export const deleteById = async (id) => {
    return SiteRepository.delete( { id: id } ); 
}

export const getAllByRiver = async (river) => {
  let sites = await SiteRepository.find({
    relations: [
      'river',
      'organisation'
    ],
  });
  sites = sites.filter(site => site.river.name === river);
  let sitesDto: any[] = [];
  sites.map(async (site) => {
    sitesDto.push({
      ...site,
      river: site.river.name,
      organisation: site.organisation.name
    });
  });
  return sitesDto;
}