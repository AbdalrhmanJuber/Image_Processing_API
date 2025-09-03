import request from 'supertest';
import app from '../../src/app';

describe('Image API Endpoints', () => {
  it('should return 200 for valid image resize request', async () => {
    const response = await request(app)
      .get('/api/images/resize')
      .query({
        filename: 'fjord.jpg',
        width: '200',
        height: '200'
      });

    expect(response.status).toBe(200);
  });

  it('should return 400 for missing parameters', async () => {
    const response = await request(app)
      .get('/api/images/resize')
      .query({
        filename: 'fjord.jpg'
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toContain('width is required');
  });

  it('should return 404 for non-existent image', async () => {
    const response = await request(app)
      .get('/api/images/resize')
      .query({
        filename: 'nonexistent.jpg',
        width: '200',
        height: '200'
      });

    expect(response.status).toBe(404);
  });
});
