export interface AddReviewDto {
  id?: string;
  userId: string;
  bookId: string;
  rating: string;
  reviewText?: string;
}
