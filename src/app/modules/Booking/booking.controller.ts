import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BookingServices } from './booking.service';
import { Response, Request } from 'express';


const createBooking = catchAsync(async (req: Request, res: Response) => {
  const bookingData = {
    ...req.body,
  
  };

  // Log the booking data to check what is being passed to the service

  const result = await BookingServices.createBookingIntoDB(bookingData);
  const response = {
    _id: result._id,
    facility: result.facility,
    date: result.date,
    startTime: result.startTime,
    endTime: result.endTime,
    user: result.user,
    payableAmount: result.payableAmount,
    isBooked: result.isBooked,
  };
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking created successfully',
    data: response,
  });
});


//get all bookings
const getAllBookings = catchAsync(async(req,res)=>{
  const result= await BookingServices.getAllBookingsFromDB()
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bookings retrieved successfully',
    data: result,
  });
})

const deleteBooking = catchAsync(async(req,res)=>{
  const {id} = req.params
  const result = await BookingServices.deleteBookingFromDB(id,req.body)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking cancelled successfully',
    data: result,
  });
  return result
})

export const BookingControllers = {
  createBooking,
  getAllBookings,
  deleteBooking
};
