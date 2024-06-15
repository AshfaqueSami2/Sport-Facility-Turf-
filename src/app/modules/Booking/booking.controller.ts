import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';
import { Response, Request } from 'express';
import { generateAvailableTimeSlots } from '../../utils/timeAvailability';
import { Booking } from './booking.model';
// import { TUser } from '../User/user.interface';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  
  const bookingData = req.body;
  bookingData.user =req.user.id

  const result = await BookingServices.createBookingIntoDB(bookingData);
  const response = {
    _id:result._id,
    facility: result.facility,
    date: result.date,
    startTime: result.startTime,
    endTime: result.endTime,
    payableAmount: result.payableAmount,
    isBooked: result.isBooked,
    user:result.user
  };

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully',
    data: response,
  });
});

//get all bookings admin
const getAllBookings = catchAsync(async (req, res) => {
  
  const result = await BookingServices.getAllBookingsFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,

  });
});

//get bookings by user
const getBookingsByUser = catchAsync(async (req, res) => {
  const userId = req.user.id;

  const result = await BookingServices.getBookingsByUserFromDB(userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
});

//delete booking
const deleteBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.deleteBookingFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking cancelled successfully',
    data: result,
  });
  return result;
});

//check availability

const checkAvailability = catchAsync(async (req: Request, res: Response) => {
  const { date } = req.query;
  const checkDate = date ? new Date(date as string) : new Date();
  const checkDateString = checkDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD

  // Retrieve bookings for the specified date
  const bookings = await Booking.find({ date: checkDateString });

  // Define total available time slots for the day
  const totalSlots = generateAvailableTimeSlots('08:00', '16:00', 1);

  // Filter out slots that are already booked
  const availableSlots = totalSlots.filter((slot) => {
    return !bookings.some((booking) => {
      return (
        (slot.startTime >= booking.startTime &&
          slot.startTime < booking.endTime) ||
        (slot.endTime > booking.startTime && slot.endTime <= booking.endTime)
      );
    });
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Availability checked successfully',
    data: availableSlots,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  deleteBooking,
  getBookingsByUser,
  checkAvailability,
};
