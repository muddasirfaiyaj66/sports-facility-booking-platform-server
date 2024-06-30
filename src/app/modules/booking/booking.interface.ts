import { Types } from "mongoose";

export interface IBooking {
    facility: Types.ObjectId;
    date: string;
    startTime: string;
    endTime: string;
    user: Types.ObjectId;
    payableAmount: number;
    isBooked: 'canceled' | 'confirmed'
  }

