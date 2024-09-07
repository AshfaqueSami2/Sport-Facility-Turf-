import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../../middlewares/validateRequest';
import auth from '../../../middlewares/auth';
import { UserValidation } from './user.validation';

const router = express.Router();

// User Registration Route
router.post(
  '/api/auth/signup',
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createUser,
);

// Admin Registration Route (Only accessible by admins)
router.post(
  '/api/auth/add-admin',
  auth('admin'),  // Ensure only admins can create other admins
  validateRequest(UserValidation.userValidationSchema),
  UserControllers.createAdmin, // Add this route
);

// Fetch User Profile Route
router.get(
  '/api/user/profile',
  auth(),  
  UserControllers.getUserProfile,
);

export const UserRoutes = router;
