import request from 'supertest';
import mongoose from 'mongoose';
import app from '../../src/app';
import { Review } from '../../src/models/Review';

// Mock the LLMService to avoid real OpenAI calls
jest.mock('../../src/services/llmService', () => ({
  LLMService: jest.fn().mockImplementation(() => ({
    analyzeCode: jest.fn().mockResolvedValue('Mocked LLM Analysis')
  }))
}));

beforeAll(async () => {
  try {
    const mongoURI = 'mongodb://127.0.0.1:27017/code-review-test';
    await mongoose.connect(mongoURI);
  } catch (error) {
    console.error('Error connecting to test database:', error);
  }
});

beforeEach(async () => {
  // Clear the database before each test
  await Review.deleteMany({});
});

afterAll(async () => {
  try {
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  } catch (error) {
    console.error('Error cleaning up test database:', error);
  }
});

describe('Review API', () => {
  it('should create a new code review', async () => {
    const response = await request(app)
      .post('/api/reviews')
      .send({
        code: 'console.log("Hello, world!");',
        language: 'javascript'
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('_id');
    expect(response.body.analysis).toBe('Mocked LLM Analysis');
  });

  it('should fetch an existing review by ID', async () => {
    const newReview = await Review.create({
      code: 'print("hi")',
      language: 'python',
      analysis: 'Looks fine.',
      timestamp: new Date()
    });

    const response = await request(app)
      .get(`/api/reviews/${newReview._id.toString()}`);
    
    expect(response.status).toBe(200);
    expect(response.body.language).toBe('python');
  });

  it('should return 404 for non-existent review', async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const response = await request(app)
      .get(`/api/reviews/${fakeId}`);
    
    expect(response.status).toBe(404);
  });
});