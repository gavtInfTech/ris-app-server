import { Session } from "../entities/Session";
import { User } from "../entities/User";
import { River } from "../entities/River";
import { AppDataSource } from "../data-source";

const SessionRepository = AppDataSource.getRepository(Session);
const UserRepository = AppDataSource.getRepository(User);
const RiverRepository = AppDataSource.getRepository(River);

// export const getAll = async () => {
//   let signs = await SignRepository.find({
//     relations: {
//       river: true,
//     },
//   });
//   let signsDto: any[] = [];
//   signs.map(async (sign) => {
//     signsDto.push({
//       ...sign,
//       river: sign.river.name,
//     });
//   });
//   return signsDto;
// };

export const getByMonth = async (month, river) => {
    let sessions = await SessionRepository.find({
        relations: {
            river: true,
            user: true
          },
    })

    let sessionByMonth = sessions.find((session) => {
        let date = new Date(session.startDate);
        if (date.getMonth() === month && river.name === river) return session;
    })
    console.log(sessionByMonth)
    return sessionByMonth;
}

export const add = async (session) => {
    let newSession = new Session();
    const river = await RiverRepository.findOneBy({ name: session.river });
    const user = await UserRepository.findOneBy({ id: session.user });
    newSession = {
        ...session,
        river: river,
        user: user,
        startDate: new Date(session.startDate),
        endDate: new Date(session.endDate)
    }
    return SessionRepository.save(newSession);
}