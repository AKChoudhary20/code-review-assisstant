class Report {
    reviewId: string;
    status: string;
    feedback: string;

    constructor(reviewId: string, status: string, feedback: string) {
        this.reviewId = reviewId;
        this.status = status;
        this.feedback = feedback;
    }
}

export default Report;