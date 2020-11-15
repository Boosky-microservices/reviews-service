import { query, validationResult, param, body } from 'express-validator';

export const reviewValidations = [
  body('rating')
    .isInt({ min: 0, max: 5 }),
  body('reviewText')
    .optional()
    .isLength({ max: 1000 }),
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = [];
    errors.array().map(e => errorMessages.push({ param: e.param, message: e.msg, value: e.value }));
    return res.status(422).json({ errors: errorMessages });
  }
  next();
};
