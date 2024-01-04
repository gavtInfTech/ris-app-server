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

export const getAll = async () => {

    let signNotices = await SignNoticeRepository.find(
        {
            relations: [
                'sign',
                'sign.river'
            ],
        }
    ); 

    let signNoticesDto: any[] = [];
    signNotices.map(async (signAlert) => {
        signNoticesDto.push({
        ...signAlert,
        sign: signAlert.sign.id,
        });
    });
    return signNoticesDto;
}

export const getAllByPeriodAndRiver = async (session, river) => {
    console.log(session);
    console.log("THIS IS SESSION ID", session.id)
    let signNotices = await SignNoticeRepository.find(
        {
            where: {
                session: {id: session}
            },
            relations: [
                'sign',
                'sign.river'
            ],
        }
    ); 
    
    console.log("SIIGNGNG", signNotices)

    signNotices = signNotices.filter(item => item.sign.river.name === river);
    console.log("SIIGNGNG FILTEEEEERES", signNotices)

    let signNoticesDto: any[] = [];
    signNotices.map(async (signNotice) => {
        signNoticesDto.push({
        ...signNotice,
        kilometrage: signNotice.sign.kilometrage,
        sign: signNotice.sign.description,
        latitude: signNotice.sign.latitude,
        longitude: signNotice.sign.longitude
        });
    });
    console.log("THISS IS DTO", signNoticesDto)
    return signNoticesDto;
}