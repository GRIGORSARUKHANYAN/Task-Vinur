import request from 'supertest';



describe('GET /user/:id', () => {
    it('should return 200 status code', async () => {
      const response = await request('http://localhost:3001').get('/task/sjdz');
      expect(response.status).toBe(400);
    });
  });



describe('GET /user/:id', () => {
  it('should return 200 status code', async () => {
    const response = await request('http://localhost:3001').get('/task/ByAssignedMemberId/sjdz');
    expect(response.status).toBe(400);
  });
});

  



  