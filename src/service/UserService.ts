import { User } from "../entities/User"
import { Organisation } from "../entities/Organisation"
import { AppDataSource } from "../data-source"

const UserRepository = AppDataSource.getRepository(User)
const OrganisationRepository = AppDataSource.getRepository(Organisation)

export const findAll =  async () => {
    let users = await UserRepository.find(
        {
            where: {
                role: "Оператор",
            },
            relations: {
                organisation: true,
            },
        }
    ); 
    let usersDto = [];
    users.map((user) => {
        usersDto.push(
            {
                id: user.id,
                username: user.username,
                organisation: user.organisation.name
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
        organisation: organisation
    }
    return UserRepository.save(user); 
}
