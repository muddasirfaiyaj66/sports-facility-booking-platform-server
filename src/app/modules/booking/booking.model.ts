import { Schema, model } from 'mongoose'
import { IBooking } from './booking.interface';


const bookingSchema = new Schema<IBooking>({
  facility:{
    type:Schema.Types.ObjectId,
    required: [true, 'Facility ID  is required'],
    ref:'Facility'
  },
  date:{
    type:String,
    required: [true, 'Date is required'],
  },
  startTime:{
    type:String,
    required: [true, 'StartTime is required'],
  },
  endTime:{
    type:String,
    required: [true, 'EndTime is required'],
  },
  user:{
    type:Schema.Types.ObjectId,
    required: [true, 'UserID  is required'],
    ref:'User'
  },
  payableAmount:{
    type:Number,
  },
  isBooked:{
    type:String,
    enum: {
        values: ['canceled', 'confirmed'],
        message: '{VALUE} is not valid',
      },
  }

});




export const Booking = model<IBooking>('Booking', bookingSchema)
