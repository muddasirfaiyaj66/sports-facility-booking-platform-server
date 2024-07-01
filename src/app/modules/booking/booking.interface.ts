import { Types } from 'mongoose'

export interface IBooking {
  facility: Types.ObjectId
  date: string
  startTime: string
  endTime: string
  user: Types.ObjectId
  payableAmount: number
  isBooked: 'canceled' | 'confirmed'
}

export interface TBooking {
  startTime: string
  endTime: string
  date: string
}

export interface TTimeSlot {
  startTime: string
  endTime: string
}
