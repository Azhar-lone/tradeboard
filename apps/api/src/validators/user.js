import { check } from 'express-validator';

export const loginValidation = [
  // email
  check('email')
    .exists()
    .withMessage('email is required')
    .isEmail()
    .withMessage('not a valid email'),
  check('password')
    .exists()
    .withMessage('password is required')
    .trim()
    .isStrongPassword()
    .withMessage('Incorrect Passord')
    .escape(),
];
