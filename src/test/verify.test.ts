import request from 'supertest';
import { expect } from 'chai';
import startServer from '../index';
import jwt from 'jsonwebtoken';

describe('Verify Middleware', function()  {

  let server; // Объявляем переменную для хранения сервера

  before(async () => {
    server = await startServer(); // Запускаем сервер и сохраняем его в переменную перед запуском тестов
  });

  it('should allow access for a valid token with correct role', async () => {
    // Создание тестового токена
    const token = jwt.sign(
      { id: 1, role: 'Администратор', organisation: "Администрация водного транспорта" },
      'rissecretkey'
    );

    const response = await request(server)
      .get('/auth/users')
      .set('Cookie', `auth=${token}`)
      .expect(200);

   
  });

  it('should return 401 if user role does not match required role', async () => {
    // Создание тестового токена
    const token = jwt.sign(
      { id: 2, role: 'Оператор', organisation: "РУ ЭСП \"Днепро-Бугский водный путь\"" },
      'rissecretkey'
    );

    const response = await request(server)
      .get('/auth/users')
      .set('Cookie', `auth=${token}`)
      .expect(401);

    expect(response.text).to.equal('У пользователя нет прав на соверешение операции!');
  });

  it('should return 403 if token is invalid', async () => {
    // Создание невалидного токена
    const token = 'invalid_token';

    const response = await request(server)
      .get('/auth/users')
      .set('Cookie', `auth=${token}`)
      .expect(403);

    expect(response.text).to.equal('Токен не валиден!');
  });

  it('should return 401 if user is not authenticated', async () => {
    const response = await request(server)
      .get('/auth/users')
      .expect(401);

    expect(response.text).to.equal('Пользователь не авторизирован!');
  });
  
});