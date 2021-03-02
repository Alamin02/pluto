import express = require('express');
import { body } from 'express-validator';

import { authenticationMiddleware } from '../middleware';

import {
  userLoginController,
  userRegistrationController,
  usersController,
} from '../controller';

const router = express.Router();

// @POST - /api/v1/users/login
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Invalid Email address'),
    body('password').not().isEmpty().withMessage('Password must not be empty'),
  ],
  userLoginController
);

// @POST - /api/v1/users/register
router.post(
  '/register',
  [
    body('name').not().isEmpty().withMessage('Name must not be empty'),
    body('email').isEmail().withMessage('Invalid Email address'),
    body('password').not().isEmpty().withMessage('Password must not be empty'),
  ],
  userRegistrationController
);

// @GET - /api/v1/users/
router.get('/', usersController);

export default router;
