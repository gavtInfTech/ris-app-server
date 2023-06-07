import { Depth } from "../entities/Depth"
import { Site } from "../entities/Site"
import { AppDataSource } from "../data-source"
import { hydronodesData } from "./levelsGuData"

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
    let depths = await DepthRepository.find({
        where: {
            site: site
        },
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

  export const getAllByDate = async (date) => {

    let depths = await DepthRepository.find(
        {
            where: {
                date: new Date(date)
            },
        }
    ); 

    return depths;
}

export const add = async (depth) => {
    let newDepth = new Depth();
    let date = new Date(depth.date);
    let depthsExist = await DepthRepository.find(
        {
            where: {
                date: date
            },
            relations: {
                site: true,
              },
        }
    );
    depthsExist.forEach((depthExist) => {
        if (depthExist.site.name === depth.site) {
            return undefined; 
        }
    })
    const site = await SiteRepository.findOneBy({ name: depth.site });
    newDepth = {
        ...depth,
        site: site
    }

    return DepthRepository.save(newDepth);
}

export const change = async (depth) => {
    let updatedDepth = new Depth();
    const site = await SiteRepository.findOneBy({ name: depth.site.name });
    updatedDepth = {
        ...depth,
        site: site,
    };
    return DepthRepository.update(depth.id, updatedDepth);
}

export const deleteById = async (id) => {
    return DepthRepository.delete(id); 
}