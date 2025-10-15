import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  code: string;
  language: string;
  analysis: string;
  timestamp: Date;
}

const ReviewSchema: Schema = new Schema({
  code: { type: String, required: true },
  language: { type: String, required: true },
  analysis: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const Review = mongoose.model<IReview>('Review', ReviewSchema);
