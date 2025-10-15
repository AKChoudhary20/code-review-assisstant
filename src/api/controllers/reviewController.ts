import { Request, Response } from 'express';
import { ReviewService } from '../../services/reviewService';
import { LLMService } from '../../services/llmService';

export class ReviewController {
  private reviewService: ReviewService;
  private llmService: LLMService;

  constructor() {
    this.reviewService = new ReviewService();
    this.llmService = new LLMService();
  }

  public async createReview(req: Request, res: Response) {
    try {
      const { code, language } = req.body;
      
      // Get LLM analysis
      const analysis = await this.llmService.analyzeCode(code, language);
      
      // Create review report
      const review = await this.reviewService.createReview({
        code,
        language,
        analysis,
        timestamp: new Date()
      });

      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create review' });
    }
  }

  public async getReview(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const review = await this.reviewService.getReview(id);
      
      if (!review) {
        return res.status(404).json({ error: 'Review not found' });
      }
      
      res.status(200).json(review);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch review' });
    }
  }
}
