import { Dislocation } from "../entities/Dislocation"
import { Organisation } from "../entities/Organisation"
import { AppDataSource } from "../data-source"

const DislocationRepository = AppDataSource.getRepository(Dislocation)
const OrganisationRepository = AppDataSource.getRepository(Organisation)

export const getAll = async () => {
    let dislocations = await DislocationRepository.find({
      relations: {
        organisation: true,
      },
    });
    let dislocationDto: any[] = [];
    dislocations.map(async (dislocation) => {
        dislocationDto.push(
            {
                ...dislocation,
                organisation: dislocation.organisation.name
            }
        )
    })
    return dislocationDto;
  };

  export const getAllByOrganisation = async (organisationName) => {
    let organisation = await OrganisationRepository.findOneBy({ name: organisationName });
    if (organisation === null) return;
    let dislocations = await DislocationRepository.find({
        where: {
            organisation: organisation
        },
        relations: {
            organisation: true,
        },
    });
    let dislocationDto: any[] = [];
    dislocations.map(async (dislocation) => {
        dislocationDto.push(
            {
                ...dislocation,
                organisation: dislocation.organisation.name
            }
        )
    })
    return dislocationDto;
  };

  export const getAllByDate = async (date) => {

    let dislocations = await DislocationRepository.find(
        {
            where: {
                date: new Date(date)
            },
        }
    ); 

    return dislocations;
}

export const add = async (dislocation) => {
    let newDislocation = new Dislocation();
    let organisation = await OrganisationRepository.findOneBy({ name: dislocation.organisation.name });
    
    newDislocation = {
        ...dislocation,
        organisation: organisation
    }
    return DislocationRepository.save(newDislocation);
}

export const change = async (dislocation) => {
    let updatedDislocation = new Dislocation();
    const organisation = await OrganisationRepository.findOneBy({ name: dislocation.organisation.name });
    updatedDislocation = {
        ...dislocation,
        organisation: organisation,
    };
    return DislocationRepository.update(dislocation.id, updatedDislocation);
}

export const deleteById = async (id) => {
    return DislocationRepository.delete(id); 
}