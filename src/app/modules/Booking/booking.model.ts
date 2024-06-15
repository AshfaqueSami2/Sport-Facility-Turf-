import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>(
  {
    date: {
      type: String,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      unique: true,
      ref: 'User',
      required: [true, 'user id is required'],
    },
    facility: {
      type: Schema.Types.ObjectId,
      ref: 'Facility',
      required: true,
    },
    payableAmount: {
      type: Number,
    },
    isBooked: {
      type: String,
      enum: ['confirmed', 'unconfirmed', 'canceled'],
      default: 'unconfirmed',
    },
  },
  {
    timestamps: true,
  },
);

export const Booking = model<TBooking>('Booking', bookingSchema);
