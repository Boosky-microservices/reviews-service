import {Types, Document} from 'mongoose';

interface ReviewBase {
    readonly rating: string;
    readonly reviewText: string;
    readonly book: string;
    readonly writer: Types.ObjectId | string;
    readonly created_at?: string;
    readonly updated_at?: string;
}

export interface ReviewModel extends ReviewBase, Document {
}

export interface IReview extends ReviewBase {
    _id?: string;
}
