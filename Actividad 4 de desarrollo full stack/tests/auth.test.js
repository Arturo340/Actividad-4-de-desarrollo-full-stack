require("dotenv").config();
const request = require('supertest');
const mongoose = require("mongoose");
const app = require('../app');

jest.setTimeout(20000);

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Autenticacion', () => {
    test('Debe registrar usuario', async () => {
      const emailUnico = `test_${Date.now()}_${Math.floor(Math.random()*10000)}@mail.com`;

        const res = await request(app)
        .post('/api/auth/register')
        .send({
            name: 'Boby',
            email: emailUnico,
            password: 'SexoAnal55#'
        });

        expect(res.statusCode).toBe(201);
    });
});