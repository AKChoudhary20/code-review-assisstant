import { Review } from '../models/Review';

export class ReviewService {
  public async createReview(reviewData: any) {
    try {
      const review = new Review(reviewData);
      return await review.save();
    } catch (error) {
      throw new Error('Failed to create review');
    }
  }

  public async getReview(id: string) {
    try {
      return await Review.findById(id);
    } catch (error) {
      throw new Error('Failed to fetch review');
    }
  }
}
