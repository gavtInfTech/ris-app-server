import { Site } from "../entities/Site"
import { AppDataSource } from "../data-source"
import { Marshrutnik } from "../entities/Marshrutnik";

const MarshrutnikRepository = AppDataSource.getRepository(Marshrutnik);
const SiteRepository = AppDataSource.getRepository(Site)


export const getAllRollsBySite = async (siteName) => {
    let site = await SiteRepository.findOneBy({ name: siteName });

    let rolls = await MarshrutnikRepository.find({
        where: {
            category: "Перекат",
            site: { id: site?.id }, // используйте объект Site с идентификатором
        },
    });
    return rolls;
};
