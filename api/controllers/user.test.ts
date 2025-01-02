import mongoose from 'mongoose';
import supertest from 'supertest';
import app from '../index.ts';
import connectToDB from '../util/db.ts';

const api = supertest(app);

beforeAll(async () => {
  await connectToDB();
}, 30000);

afterAll(async () => {
  await mongoose.connection.close();
});

test('returned a valid user json ', async () => {
  const newUser = {
    username: 'neil',
    email: 'neiljustin.mallari@gmail.com',
    password: 'neil',
  };

  await api
    .post('/api/users')
    .send(newUser)
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 30000);

test('returned a modified user json', async () => {
  const updatedUser = {
    username: 'justin',
  };

  await api
    .put('/api/users/677647e9702b042eaa83e532')
    .send(updatedUser)
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('deletion returned status code 204', async () => {
  await api.delete('/api/users/677647e9702b042eaa83e532').expect(204);
});
