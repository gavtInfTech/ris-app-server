import { Site } from "../entities/Site";
import { River } from "../entities/River";
import { Organisation } from "../entities/Organisation";
import { AppDataSource } from "../data-source";
import { Marshrutnik } from "../entities/Marshrutnik";
import { SiteAccordance } from "../entities/SiteAccordance";

const MarshrutnikRepository = AppDataSource.getRepository(Marshrutnik);
const SiteRepository = AppDataSource.getRepository(Site);
const RiverRepository = AppDataSource.getRepository(River);
const OrganisationRepository = AppDataSource.getRepository(Organisation);
const AccordanceRepository = AppDataSource.getRepository(SiteAccordance)

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

export const deleteById = async (siteId) => {
  // Find all Marshrutniks associated with the given Site
  const marshrutniksToDelete = await MarshrutnikRepository.find({ where: { site: { id: siteId } } });
  const accordanceToDelete = await AccordanceRepository.find({ where: { site: { id: siteId } } });

  // Delete Marshrutniks
  await MarshrutnikRepository.remove(marshrutniksToDelete);
  await AccordanceRepository.remove(accordanceToDelete);

  await SiteRepository.delete({ id: siteId });
};

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
