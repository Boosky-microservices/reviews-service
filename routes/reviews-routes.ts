import {checkJwt} from '../config/auth.config';
import {reviewValidations, validate} from '../config/validation.config';
import {deleteReview, putReview} from '../repositories/reviews.repository';
import {Router} from 'express';
const route = Router();

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
route.put('/:bookId/reviews', checkJwt, reviewValidations, validate, putReview);
/**
 * @swagger
 * /books/{bookId}/reviews/:
 *  parameters:
 *    - in: path
 *      name: bookId
 *      schema:
 *        type: string
 *  patch:
 *    parameters:
 *      - in: query
 *        name: rid
 *        schema:
 *          type: string
 *        description: recommendation id
 *      - in: body
 *        name: body
 *        schema:
 *          $ref: "#/definitions/ReviewDto"
 *    security:
 *      - bearerAuth: []
 *    tags:
 *    - "book"
 *    summary: updates review for the book
 *    description: updates review for the book
 *    responses:
 *      '200':
 *        description: Success!
 *  delete:
 *    tags:
 *    - "book"
 *    summary: deletes a review for the book
 *    description: deletes a review for the book
 *    responses:
 *      '200':
 *        description: Success!
 *    security:
 *      - bearerAuth: []
 */
route.patch('/:bookId/reviews', checkJwt, reviewValidations, validate, putReview);
route.delete('/:bookId/reviews', checkJwt, deleteReview);

export default route;
