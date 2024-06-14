import express from 'express';
import { FacilityController } from './facility.controller';
import auth from '../../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../../middlewares/validateRequest';
import { FacilityValidation } from './facility.validation';

const router = express.Router();

router.post(
  '/api/facility',
  auth(USER_ROLE.admin),
  validateRequest(FacilityValidation.facilityValidationSchema),
  FacilityController.createFacility,
);

router.put(
  '/api/facility/:id',
  auth(USER_ROLE.admin),
  validateRequest(FacilityValidation.updatefacilityValidationSchema),
  FacilityController.updateFacility,
);

router.get('/api/facility', FacilityController.getAllFacilites);

export const FacilityRoutes = router;
