import request from 'supertest';
import { expect } from 'chai';
import startServer from '../index';
import { LevelGp } from '../entities/LevelGp';
import { AppDataSource } from "../data-source"

const LevelsGpRepository = AppDataSource.getRepository(LevelGp)

describe('Add Level API', function()  {

  let server; // Объявляем переменную для хранения сервера

  before(async () => {
    server = await startServer(); // Запускаем сервер и сохраняем его в переменную перед запуском тестов
  });

  it('should add a new level and return a success message', async () => {

    const date = new Date();
    const levelData = {
      id: 1,
      hydropost: "TestName",
      level1: "2",
      level2: "3",
      difference: "0",
      date: date,
      river: "Днепр"
    };

    const response = await request(server)
      .post('/levelsGp/add')
      .send(levelData)
      .expect(200);

    expect(response.text).to.equal('Уровень успешно добавлен!');
    
    const addedLevel = await LevelsGpRepository.findOneBy({ hydropost: "TestName" })
    expect(addedLevel).to.exist;
    expect(addedLevel.hydropost).to.equal('TestName');
    
  });

  it('should not add a new level and return an error message', async () => {
    const date = new Date();
    const levelData = {
      id: 3,
      hydropost: "TestName",
      level1: "2",
      level2: "3",
      difference: "0",
      date: date,
      river: "Днепр"
    };

    const response = await request(server)
      .post('/levelsGp/add')
      .send(levelData)
      .expect(200);

    expect(response.text).to.equal('Уровень на текующий день уже существует!');  
  }).timeout(5000);
});