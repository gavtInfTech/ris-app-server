import { Notice } from "../entities/Notice"
import { Organisation } from "../entities/Organisation"
import { AppDataSource } from "../data-source"

const NoticeRepository = AppDataSource.getRepository(Notice)
const OrganisationRepository = AppDataSource.getRepository(Organisation)

export const findAll =  async () => {
    let depths = await NoticeRepository.find(
        {
            relations: [
                'site',
                'site.river'
            ],
        }
    ); 

    return depths;
}