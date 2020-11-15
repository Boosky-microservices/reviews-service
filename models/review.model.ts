import mongoose, {Schema} from 'mongoose';
import {ReviewModel} from '../interfaces/review/review.interface';

const ReviewSchema = new Schema(
    {
        rating: {
            type: Number,
            min: 0,
            max: 5,
            required: true,
        },
        reviewText: {
            type: String,
            maxlength: 1000,
        },
        book: {
            type: String,
            required: true,
        },
        writer: {
            type: String,
            required: true,
        },
    },
    {timestamps: true},
);

ReviewSchema.index({ book: 1, writer: 1 }, { unique: true });

export default mongoose.model<ReviewModel>('Review', ReviewSchema);
