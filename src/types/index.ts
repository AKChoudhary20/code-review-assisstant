// src/types/index.ts

export interface Review {
    id: string;
    code: string;
    suggestions: string[];
}

export interface Report {
    reviewId: string;
    status: string;
    feedback: string;
}

export interface ReviewRequest {
    code: string;
}

export interface ReviewResponse {
    reviewId: string;
    suggestions: string[];
    status: string;
}