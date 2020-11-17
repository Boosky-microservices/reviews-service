import {checkJwt} from '../config/auth.config';
import {reviewValidations, validate} from '../config/validation.config';
import {deleteReview, getReviews, putReview} from '../controllers/review.controller';
import {Router} from 'express';
const route = Router();
/**
 * @swagger
 * /reviews:
 *  get:
 *    tags:
 *    - "review"
 *    summary: get reviews
 *    description: get reviews
 *    parameters:
 *      - in: query
 *        name: q
 *    responses:
 *      '200':
 */
route.get('/:bookId', getReviews);

/**
 * @swagger
 * /books/{bookId}/reviews/:
 *  parameters:
 *    - in: path
 *      name: bookId
 *      schema:
 *        type: string
 *  put:
 *    parameters:
 *      - in: body
 *        name: body
 *        schema:
 *          $ref: "#/definitions/ReviewDto"
 *      - in: query
 *        name: rid
 *        schema:
 *          type: string
 *        description: recommendation id
 *    tags:
 *    - "book"
 *    summary: create a new review for the book
 *    description: create a new review for the book
 *    responses:
 *      '200':
 *        description: Success!
 *    security:
 *      - bearerAuth: []
 */
route.put('/', checkJwt, reviewValidations, validate, putReview);

route.delete('/', checkJwt, deleteReview);

export default route;
