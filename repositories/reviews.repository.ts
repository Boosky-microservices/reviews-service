import {AddReviewDto} from '../interfaces/review/dto/add-review.dto';
import {Result} from '../interfaces/result.interface';
import {model} from 'mongoose';
import {Review} from '../interfaces/review/review.interface';
import {DeleteReviewDto} from '../interfaces/review/dto/delete-review.dto';

const Review = model('Review');

export const putReview = async (addReviewDto: AddReviewDto): Promise<Result<boolean>> => {
    const result: Result<boolean> = {data: false, errors: null};
    // if not, create a new review
    const review: Review = {
        rating: addReviewDto.rating,
        reviewText: addReviewDto.reviewText,
        writer: addReviewDto.userId,
        book: addReviewDto.bookId,
    };
    try {
        await Review.create(review);
        result.data = true;
    } catch (error) {
        result.errors = error;
    }
    return result;
};

export const deleteReview = async (deleteReviewDto: DeleteReviewDto): Promise<Result<boolean>> => {
    const result: Result<boolean> = {data: false, errors: null};
    try {
        await Review.deleteOne({_id: deleteReviewDto.id});
        result.data = true;
    } catch (error) {
        result.errors = error;
    }
    return result;
};
