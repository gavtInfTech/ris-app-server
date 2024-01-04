import { User } from "../entities/User"
import { Organisation } from "../entities/Organisation"
import { AppDataSource } from "../data-source"
import CryptoJS from "crypto-js";
import { In } from "typeorm";

const UserRepository = AppDataSource.getRepository(User)
const OrganisationRepository = AppDataSource.getRepository(Organisation)

export const getAll =  async () => {
    let users = await UserRepository.find(
        {
            where: {
                role: In(['Диспетчер', 'Путевик']),
            },
            relations: {
                organisation: true,
            },
        }
    ); 
    let usersDto: any = [];
    users.map((user) => {
        usersDto.push(
            {
                ...user,
                organisation: user.organisation.name,
                password: CryptoJS.AES.decrypt(user.password, "jhfycghdbndhfjhweiru").toString(CryptoJS.enc.Utf8),
            }
        )
    })
    return usersDto;
}

export const findByUsername = (username) => {
    return UserRepository.findOne(
        {
            where: {
                username: username,
            },
            relations: {
                organisation: true
            },
        }
    ); 
}

export const deleteById = (id) => {
    return UserRepository.delete(id); 
}

export const save = async (regUser) => {
    let organisation = await OrganisationRepository.findOneBy({ name: regUser.organisation });
    let user = new User();
    user = {
        ...regUser,
        organisation: organisation,
        password: CryptoJS.AES.encrypt(regUser.password, "jhfycghdbndhfjhweiru").toString(),
    }
    return UserRepository.save(user); 
}

export const change = async (userUpdated) => {
    console.log(userUpdated);
    let organisation = await OrganisationRepository.findOneBy({ name: userUpdated.organisation });
    let user = new User();
    user = {
        ...userUpdated,
        organisation: organisation,
        password: CryptoJS.AES.encrypt(userUpdated.password, "jhfycghdbndhfjhweiru").toString(),
    };
    return UserRepository.save(user);
}