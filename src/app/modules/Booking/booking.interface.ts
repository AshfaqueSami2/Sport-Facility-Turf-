import { Types } from 'mongoose';

export interface TBooking {
  date: string;
  startTime: string;
  endTime: string;
   user1:Types.ObjectId;
  facility: Types.ObjectId;
  payableAmount: number;
  isBooked: 'confirmed' | 'unconfirmed' | 'canceled';
}

