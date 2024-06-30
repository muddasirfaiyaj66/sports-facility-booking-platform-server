import { Facility } from '../facility/facility.model'
import { IBooking } from './booking.interface'
import { Booking } from './booking.model'

const createBookingIntoDB = async (
  payload: Partial<IBooking>,
  user: string,
) => {
  const { facility, date, startTime, endTime } = payload
  
  const facilityDetails = await Facility.findById(facility)
  if (!facilityDetails) {
    throw new Error('Facility not found')
  }
  const conflictingBookings = await Booking.find({
    facility,
    date,
    startTime: { $lt: endTime },
    endTime: { $gt: startTime },
  })
  if (conflictingBookings.length > 0) {
    throw new Error(
      'The facility is unavailable during the requested time slot',
    )
  }

  const payableAmount = facilityDetails.pricePerHour * ((new Date(`1970-01-01T${endTime}Z`).getHours() - new Date(`1970-01-01T${startTime}Z`).getHours()));
  const isBooked = 'confirmed';
  const bookingData = {...payload, isBooked,payableAmount,user};
  const result = await Booking.create(bookingData)

  return result;
}




export const BookingService = {
    createBookingIntoDB
}
