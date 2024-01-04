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

        dislocations = await DislocationRepository.find({
            where: { 
                organisation: organisation 
            },
            relations: {
                organisation: true
            } 
        });

        // dislocations = await DislocationRepository
        // .createQueryBuilder('dislocation')
        // .leftJoinAndSelect('dislocation.organisation', 'organisation')
        // .where(`organisation.id = :id`, { id: organisation.id })
        // .getMany();
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

    if (dislocation.id.includes("_change") && dislocation.confirmation){
        await DislocationRepository.delete({ id: dislocation.id }); 
        dislocation.id = dislocation.id.replace(/_change$/, '');
    }

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

export const deleteByIdWithConfirm = async (id) => {
    try {
      // Find the LevelGp record by id
      const DislocationToUpdate = await DislocationRepository.findOne(
        {
          where: {
            id: id
          },
        }
      );
  
      // Check if the record exists
      if (DislocationToUpdate) {
        // Update the status field to "Удалено"
        DislocationToUpdate.typeOfChange = 'Удалено';
        DislocationToUpdate.confirmation = false;
        // Save the updated record
        await DislocationRepository.save(DislocationToUpdate);
  
        // Return the updated record
        return DislocationToUpdate;
      } else {
        // If the record with the provided id is not found, you can throw an error or handle it as needed.
        throw new Error(`DislocationToUpdate record with id ${id} not found.`);
      }
    } catch (error) {
      // Handle errors, log them, or throw them as needed
      console.error('Error deleting DislocationToUpdate record:', error);
      throw error;
    }
  };