import { Client } from "../entities/Client";
import { AppDataSource } from "../data-source";
import CryptoJS from "crypto-js";

const ClientRepository = AppDataSource.getRepository(Client);

export const getAll = async () => {
  let clients = await ClientRepository.find();
  let clientsDto: any[] = [];
  clients.map((client) => {
    clientsDto.push({
      ...client,
      password: CryptoJS.AES.decrypt(client.password, "jhfycghdbndhfjhweiru").toString(CryptoJS.enc.Utf8),
    });
  });
  return clientsDto;
};

export const findByEmail = (email) => {
  return ClientRepository.findOne({
    where: {
      email: email,
    },
  });
};

export const deleteById = (id) => {
  return ClientRepository.delete(id);
};

export const save = async (regClient) => {
  let client = new Client();
  client = {
    ...regClient,
    password: CryptoJS.AES.encrypt(regClient.password, "jhfycghdbndhfjhweiru").toString(),
    confirmed: false
  };
  return ClientRepository.save(client);
};

export const change = async (clientUpdated) => {
    let client = new Client();
    client = {
        ...clientUpdated,
        password: CryptoJS.AES.encrypt(clientUpdated.password, "jhfycghdbndhfjhweiru").toString(),
    };
    return ClientRepository.save(client);
}
