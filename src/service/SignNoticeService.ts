import { SignNotice } from "../entities/SignNotice";
import { River } from "../entities/River";
import { Sign } from "../entities/Sign";
import { AppDataSource } from "../data-source";
import { Between } from 'typeorm';

const SignNoticeRepository = AppDataSource.getRepository(SignNotice);
const RiverRepository = AppDataSource.getRepository(River);
const SignRepository = AppDataSource.getRepository(Sign);

export const add = async (signNotice) => {
    let newSignNotice = new SignNotice();
    const sign = await SignRepository.findOneBy({ id: signNotice.sign });
    newSignNotice = {
        ...signNotice,
        sign: sign,
        date: new Date(signNotice.date)
    }
    return SignNoticeRepository.save(newSignNotice);
}

export const getAllByPeriodAndRiver = async (startPeriod, endPeriod, river) => {
    const startPeriodDate = new Date(startPeriod);  
    const endPeriodDate = new Date(endPeriod);
    const startDate = new Date(startPeriodDate.getFullYear(), startPeriodDate.getMonth(), startPeriodDate.getDate(), 0, 0, 0);
    const endDate = new Date(endPeriodDate.getFullYear(), endPeriodDate.getMonth(), endPeriodDate.getDate(), 23, 59, 59); 
    let signNotices = await SignNoticeRepository.find(
        {
            where: {
                date: Between(startDate, endDate)
            },
            relations: [
                'sign',
                'sign.river'
            ],
        }
    ); 

    signNotices = signNotices.filter(item => item.sign.river.name === river);
    let signNoticesDto: any[] = [];
    signNotices.map(async (signAlert) => {
        signNoticesDto.push({
        ...signAlert,
        sign: signAlert.sign.description,
        latitude: signAlert.sign.latitude,
        longitude: signAlert.sign.longitude
        });
    });
    return signNoticesDto;
}