import { Notice } from "../entities/Notice"
import { Site } from "../entities/Site"
import { AppDataSource } from "../data-source"

const NoticeRepository = AppDataSource.getRepository(Notice)
const SiteRepository = AppDataSource.getRepository(Site)

export const getAll = async () => {
    let notices = await NoticeRepository.find({
      relations: [
        'site',
        'site.river'
      ],
    });
    let noticesDto: any[] = [];
    notices.map(async (notice) => {
        noticesDto.push(
            {
                ...notice,
                site: notice.site.name,
                river: notice.site.river.name
            }
        )
    })
    return noticesDto;
  };

  export const getAllByDate = async (date) => {

    let notices = await NoticeRepository.find(
        {
            where: {
                date: new Date(date)
            },
            relations: [
                'site',
                'site.river'
              ],
        }
    ); 
    let noticesDto: any[] = [];
    notices.map(async (notice) => {
        noticesDto.push(
            {
                ...notice,
                site: notice.site.name,
                river: notice.site.river.name
            }
        )
    })
    return noticesDto;
}

export const add = async (notice) => {
    let newNotice = new Notice();
    let site = await SiteRepository.findOneBy({ name: notice.site.name });
    
    newNotice = {
        ...notice,
        site: site
    }
    return NoticeRepository.save(newNotice);
}

export const change = async (notice) => {
    let updatedNotice = new Notice();
    const site = await SiteRepository.findOneBy({ name: notice.site });
    updatedNotice = {
        ...notice,
        site: site,
    };
    return NoticeRepository.update(notice.id, updatedNotice);
}

export const deleteById = async (id) => {
    return NoticeRepository.delete(id); 
}