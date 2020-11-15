import {Schema} from 'mongoose';

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
            type: Schema.Types.ObjectId,
            required: true,
        },
        writer: {
            type: Schema.Types.ObjectId,
            required: true,
        },
    },
    {timestamps: true},
);

/*
ReviewSchema.index({ book: 1, writer: 1 }, { unique: true });
*/

export default {name: 'Review', schema: ReviewSchema};
