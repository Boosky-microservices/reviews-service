import {AddReviewDto} from '../interfaces/review/dto/add-review.dto';
import {Result} from '../interfaces/result.interface';
import {IReview} from '../interfaces/review/review.interface';
import {DeleteReviewDto} from '../interfaces/review/dto/delete-review.dto';
import Review from '../models/review.model';

export const getReviews = async (bookId: string): Promise<Result<IReview[]>> => {
    const result: Result<IReview[]> = {data: [], errors: null};
    try {
        result.data = (await Review.find({book: bookId}));
    } catch (error) {
        result.errors = error;
    }
    return result;
};

export const putReview = async (addReviewDto: AddReviewDto): Promise<Result<boolean>> => {
    const result: Result<boolean> = {data: false, errors: null};
    // if not, create a new review
    const foundReview = await Review.findOne({
        writer: addReviewDto.userId,
        book: addReviewDto.bookId,
    });
    try {
        if (!!foundReview) {
            await Review.updateOne({_id: foundReview._id}, {
                rating: addReviewDto.rating,
                reviewText: addReviewDto.reviewText,
            });
        } else {
            const review: IReview = {
                rating: addReviewDto.rating,
                reviewText: addReviewDto.reviewText,
                writer: addReviewDto.userId,
                book: addReviewDto.bookId,
            };

            await Review.create(review);
        }
        result.data = true;
    } catch (error) {
        result.errors = error;
    }
    return result;
};

export const deleteReview = async (deleteReviewDto: DeleteReviewDto): Promise<Result<boolean>> => {
    const result: Result<boolean> = {data: false, errors: null};
    try {
        await Review.deleteOne({book: deleteReviewDto.bookId, writer: deleteReviewDto.userId});
        result.data = true;
    } catch (error) {
        result.errors = error;
    }
    return result;
};
