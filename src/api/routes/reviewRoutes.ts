import { Router } from 'express';
import { ReviewController } from '../controllers/reviewController';

const router = Router();
const reviewController = new ReviewController();

router.post('/', (req, res) => reviewController.createReview(req, res));
router.get('/:id', (req, res) => reviewController.getReview(req, res));

export default router;
