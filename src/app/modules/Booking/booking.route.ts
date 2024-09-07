import express from 'express';
import auth from '../../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import validateRequest from '../../../middlewares/validateRequest';
import { BookingValidation } from './booking.validation';
import { BookingControllers } from './booking.controller';


const router = express.Router();

router.post(
  '/api/bookings',
  auth(USER_ROLE.user,),
  validateRequest(BookingValidation.createBookingValidationSchema),
  BookingControllers.createBooking,
);

router.get('/api/bookings/user',auth(USER_ROLE.user),BookingControllers.getBookingsByUser)

router.get(
  '/api/bookings',
  auth(USER_ROLE.admin),
  BookingControllers.getAllBookings,
);

router.get('/api/check-availability',BookingControllers.checkAvailability);



router.delete(
  '/api/bookings/:id',
  auth(USER_ROLE.user),
  BookingControllers.deleteBooking,
);
export const BookingsRoutes = router;
