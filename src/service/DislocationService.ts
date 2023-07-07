import { Dislocation } from "../entities/Dislocation"
import { Organisation } from "../entities/Organisation"
import { AppDataSource } from "../data-source"
import { Between } from 'typeorm';

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
    let dislocations;
    if (organisationName === "Государственная администрация водного транспорта") {
        dislocations = await DislocationRepository.find({
            relations: {
                organisation: true,
            },
        });
    } else {
        let organisation = await OrganisationRepository.findOneBy({ name: organisationName });
        if (organisation === null) return;

        dislocations = await DislocationRepository
        .createQueryBuilder('dislocation')
        .leftJoinAndSelect('dislocation.organisation', 'organisation')
        .where(`organisation.id = :id`, { id: organisation.id })
        .getMany();
        console.log(dislocations)
    }
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
    const currentDate = new Date(date);  
    const startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 0, 0, 0);
    const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), 23, 59, 59);
    let dislocations = await DislocationRepository.find(
        {
            where: {
                date: Between(startDate, endDate)
            },
            relations: {
                organisation: true,
            },
        }
    ); 

    let dislocationsDto: any[] = [];
    dislocations.map(async (dislocation) => {
        dislocationsDto.push(
            {
                ...dislocation,
                organisation: dislocation.organisation.name,
            }
        )
    })
    return dislocationsDto;
}

export const getAllByPeriod = async (startPeriod, endPeriod) => {
    const startPeriodDate = new Date(startPeriod);  
    const endPeriodDate = new Date(endPeriod);
    const startDate = new Date(startPeriodDate.getFullYear(), startPeriodDate.getMonth(), startPeriodDate.getDate(), 0, 0, 0);
    const endDate = new Date(endPeriodDate.getFullYear(), endPeriodDate.getMonth(), endPeriodDate.getDate(), 23, 59, 59); 
    let dislocations = await DislocationRepository.find(
        {
            where: {
                date: Between(startDate, endDate)
            },
            relations: {
                organisation: true,
            },
        }
    ); 

    let dislocationsDto: any[] = [];
    dislocations.map(async (dislocation) => {
        dislocationsDto.push(
            {
                ...dislocation,
                organisation: dislocation.organisation.name,
            }
        )
    })
    return dislocationsDto;
}

export const add = async (dislocation) => {
    let newDislocation = new Dislocation();
    let organisation = await OrganisationRepository.findOneBy({ name: dislocation.organisation });
    
    newDislocation = {
        ...dislocation,
        organisation: organisation,
        date: new Date(dislocation.date)
    }
    return DislocationRepository.save(newDislocation);
}

export const change = async (dislocation) => {
    let updatedDislocation = new Dislocation();
    const organisation = await OrganisationRepository.findOneBy({ name: dislocation.organisation });
    updatedDislocation = {
        ...dislocation,
        organisation: organisation,
        date: new Date(dislocation.date)
    };
    await DislocationRepository.delete( {id: dislocation.id} ); 
    return DislocationRepository.save(updatedDislocation);
}

export const deleteById = async (id) => {
    return DislocationRepository.delete( {id: id} ); 
}