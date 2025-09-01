const request = require('supertest');
const app = require('../server'); // tumhara express app
let token;

beforeAll(async () => {
  // login and get JWT
  const res = await request(app).post('/api/v1/auth/login').send({
    email: 'superadmin@example.com',
    password: 'Test1234!'
  });
  token = res.body.token;
});

test('GET /users without token should fail', async () => {
  const res = await request(app).get('/api/v1/superadmin/users');
  expect(res.statusCode).toBe(401);
});

test('GET /users with token should succeed', async () => {
  const res = await request(app)
    .get('/api/v1/superadmin/users')
    .set('Authorization', `Bearer ${token}`);
  expect(res.statusCode).toBe(200);
  expect(Array.isArray(res.body)).toBe(true);
});
