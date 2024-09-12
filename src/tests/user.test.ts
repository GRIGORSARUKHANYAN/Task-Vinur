import request from 'supertest';

describe('GET /user', () => {
  it('should return 200 status code', async () => {
    const response = await request('http://localhost:3001').get('/user');
    expect(response.status).toBe(200);
  });
});


describe('GET /user/:id', () => {
    it('should return 200 status code', async () => {
      const response = await request('http://localhost:3001').get('/user/sjdz');
      expect(response.status).toBe(400);
    });
  });


  
describe('GET /user/:id', () => {
    it('should return 200 status code', async () => {
      const response = await request('http://localhost:3001').post('/user').send({name:"sa",surname:"sad",email:"example@gmail.com",password:"Password123."});
      expect(response.status).toBe(400);
    });
  });


  