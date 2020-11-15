import {Request, Response} from 'express';
import {AddReviewDto} from '../interfaces/review/dto/add-review.dto';
import * as reviewRepo from '../repositories/reviews.repository';
import {DeleteReviewDto} from '../interfaces/review/dto/delete-review.dto';

export const getReviews = async (req: Request, res: Response) => {
    const result = await reviewRepo.getReviews(req.params.bookId);
    if (result.errors) {
        return res.status(400).json({errors: result.errors});
    }
    return res.json({success: result.data});
};

export const putReview = async (req: Request, res: Response) => {
    const addReviewDto: AddReviewDto = {
        id: req.body.id,
        bookId: req.body.bookId,
        userId: (req as any).user.sub,
        rating: req.body.rating,
        reviewText: req.body.reviewText,
    };

    const result = await reviewRepo.putReview(addReviewDto);
    if (result.errors) {
        return res.status(400).json({errors: result.errors});
    }
    return res.json({success: result.data});
};

export const deleteReview = async (req: Request, res: Response) => {
    const deleteReviewDto: DeleteReviewDto = {
        id: req.params.id,
    };

    const result = await reviewRepo.deleteReview(deleteReviewDto);
    if (result.errors) {
        return res.status(400).json({errors: result.errors});
    }
    return res.json({success: result.data});
};
