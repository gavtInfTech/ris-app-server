import { Session } from "../entities/Session";
import { Change } from "../entities/Change";
import { AppDataSource } from "../data-source";

const SessionRepository = AppDataSource.getRepository(Session);
const ChangeRepository = AppDataSource.getRepository(Change);

export const add = async (change) => {
  let newChange = new Session();
  const session = await SessionRepository.findOneBy({ id: change.session });
  newChange = {
    ...change,
    session: session,
  };
  return ChangeRepository.save(newChange);
};

export const getBySession = async (sessionId) => {
  let session = await SessionRepository.findOneBy({ id: sessionId });
  if (session === null) return;
  let changes = await ChangeRepository.find({
    where: {
      session: session,
    },
    relations: {
      session: true,
    },
  });

  let changesDto: any = [];
  changes.forEach((item) => {
    changesDto.push({
      ...item,
      session: item.session.id
    });
  });
  return changesDto;
};

export const getSiteChagnesBySession = async (sessionId) => {
  let session = await SessionRepository.findOneBy({ id: sessionId });
  if (session === null) return;
  let changes = await ChangeRepository.find({
    where: {
      session: session,
    },
    relations: {
      session: true,
    },
  });
  changes.filter((change) => change.type === "region");
  let changesDto: any = [];
  changes.forEach((item) => {
    changesDto.push({
      ...item,
      session: item.session.id
    });
  });
  return changesDto;
};
