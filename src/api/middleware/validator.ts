import { Request, Response, NextFunction } from 'express';

export const validateReviewRequest = (req: Request, res: Response, next: NextFunction) => {
    const { code } = req.body;

    if (!code || typeof code !== 'string') {
        return res.status(400).json({ error: 'Invalid request: code is required and must be a string.' });
    }

    next();
};

export const validateReportRequest = (req: Request, res: Response, next: NextFunction) => {
    const { reviewId } = req.params;

    if (!reviewId) {
        return res.status(400).json({ error: 'Invalid request: reviewId is required.' });
    }

    next();
};