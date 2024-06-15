import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TBooking } from './booking.interface';
import { Facility } from '../Facility/facility.model';
// import { calculatePayableAmount } from '../../utils/calculatePayableAmount';
import { Booking } from './booking.model';
import {
  calculatePayableAmount,
  combineDateAndTime,
} from '../../utils/calculatePayableAmount';





//creating booking and some validation user

const createBookingIntoDB = async (bookingData: Partial<TBooking>) => {
  const { facility, date, startTime, endTime,user} = bookingData;

  if (!facility || !date || !startTime || !endTime || !user ) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Facility, date, startTime, endTime, and user are required',
    );
  }

  const facilityData = await Facility.findById(facility);
  if (!facilityData) {
    throw new AppError(httpStatus.NOT_FOUND, 'Facility not found');
  }

  // Check if the slot is already booked
  const existingBookings = await Booking.find({ date, facility });
  const isSlotBooked = existingBookings.some((booking) => {
    return (
      (startTime >= booking.startTime && startTime < booking.endTime) ||
      (endTime > booking.startTime && endTime <= booking.endTime)
    );
  });

  if (isSlotBooked) {
    throw new AppError(httpStatus.CONFLICT, 'Time slot is already booked');
  }

  const combinedStartTime = combineDateAndTime(date, startTime);
  const combinedEndTime = combineDateAndTime(date, endTime);

  const payableAmount = calculatePayableAmount(
    combinedStartTime,
    combinedEndTime,
    facilityData.pricePerHour,
  );

  const newBooking = new Booking({
    ...bookingData,
    startTime,
    endTime,
    payableAmount,
    isBooked: 'confirmed',
  });

  const result = await newBooking.save();
  return result;
};


//get all bookings (Admin)
const getAllBookingsFromDB = async () => {
  const result = await Booking.find().populate('facility').populate('user');
  return result;
};

//get booking by user
const getBookingsByUserFromDB = async (userId: string): Promise<TBooking[]> => {
  const result = await Booking.find({ user: userId }).populate('facility').populate('user');
  return result;
};

//delete a booking (User)
const deleteBookingFromDB = async (id: string): Promise<TBooking | null> => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isBooked: 'canceled' },
    { new: true },
  ).populate('facility').populate('user');
  return result;
};



export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  deleteBookingFromDB,
  getBookingsByUserFromDB,
  
};
