import request from 'supertest';
import { expect } from 'chai';
import startServer from '../index';

describe('Add Level API', function()  {

    let server; // Объявляем переменную для хранения сервера
  
    before(async () => {
      server = await startServer(); // Запускаем сервер и сохраняем его в переменную перед запуском тестов
    });
  
    describe('Login Check API', () => {
        it('should return a valid token and set the "auth" cookie when valid credentials are provided', async () => {
          const validCredentials = {
            username: 'admin',
            password: 'admin',
          };
      
          const response = await request(server)
            .post('/auth/login')
            .send(validCredentials);
      
          expect(response.status).to.equal(200);
          expect(response.body.role).to.equal('Администратор');
          expect(response.body.organisation).to.equal('Администрация водного транспорта');
        });
      
        it('should return a 404 status and error message when user is not found', async () => {
          const response = await request(server)
            .post('/auth/login')
            .send({ username: 'qwe', password: 'qwe' });
      
          expect(response.status).to.equal(404);
          expect(response.text).to.equal('Пользователь не найден!');
        });
      
        it('should return a 404 status and error message when invalid credentials are provided', async () => {     
          const response = await request(server)
            .post('/auth/login')
            .send({ username: 'admin', password: '123' });
      
          expect(response.status).to.equal(404);
          expect(response.text).to.equal('Неверное имя пользователя или пароль!');
        });
      });

  });