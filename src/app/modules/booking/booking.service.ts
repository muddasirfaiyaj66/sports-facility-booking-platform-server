import httpStatus from 'http-status'
import AppError from '../../errors/AppError'
import { Facility } from '../facility/facility.model'
import { IBooking, TBooking, TTimeSlot } from './booking.interface'
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

  const start = new Date(`1970-01-01T${startTime}Z`)
  const end = new Date(`1970-01-01T${endTime}Z`)

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('Invalid startTime or endTime')
  }

  let duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60)

  if (duration < 0) {
    duration += 24
  }

  const amount = facilityDetails.pricePerHour * duration
  if (isNaN(amount)) {
    throw new Error('Failed to calculate payable amount')
  }

  const payableAmount = amount
  const isBooked = 'confirmed'
  const bookingData = { ...payload, isBooked, payableAmount, user }
  const result = await Booking.create(bookingData)

  return result
}

const checkAvailabilityFromDB = async (formattedDate: string) => {
  const findAvailableTimeSlots = async (
    bookings: TBooking[] | null,
  ): Promise<TTimeSlot[]> => {
    const dayStart = 0
    const dayEnd = 23

    if (!bookings || bookings.length === 0) {
      return [
        {
          startTime: `${dayStart.toString().padStart(2, '0')}:00`,
          endTime: `${dayEnd.toString().padStart(2, '0')}:59`,
        },
      ]
    }

    const availableSlots: TTimeSlot[] = []
    let lastEndTime = dayStart

    bookings.forEach(booking => {
      const bookingStart = new Date(
        `1970-01-01T${booking.startTime}:00Z`,
      ).getUTCHours()
      const bookingEnd = new Date(
        `1970-01-01T${booking.endTime}:00Z`,
      ).getUTCHours()

      if (bookingStart > lastEndTime) {
        availableSlots.push({
          startTime: `${lastEndTime.toString().padStart(2, '0')}:00`,
          endTime: `${bookingStart.toString().padStart(2, '0')}:00`,
        })
      }
      lastEndTime = bookingEnd
    })

    if (lastEndTime < dayEnd) {
      availableSlots.push({
        startTime: `${lastEndTime.toString().padStart(2, '0')}:00`,
        endTime: `${dayEnd.toString().padStart(2, '0')}:59`,
      })
    }

    return availableSlots
  }

  let bookings: TBooking[] | null = null

  bookings = await Booking.find({ date: formattedDate }).sort({ startTime: 1 })

  const availableSlots = await findAvailableTimeSlots(bookings)

  if (availableSlots.length === 0) {
    throw new AppError(httpStatus.NOT_FOUND, 'Unavailable Slot')
  }

  return availableSlots
}
const getUserBookingsFromDB = async (userId: string) => {
  const result = await Booking.find({ user: userId }).populate('facility')
  return result
}

const getAllBookingsFromDB = async () => {
  const result = await Booking.find().populate('facility').populate('user')

  return result
}

const cancelABookingFromDB = async (user: string, id: string) => {
  const data = await Booking.findById(id)
  if (!data) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found')
  }
  if (data.user.toString() !== user) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'You have no access to this route',
    )
  }
  const result = await Booking.findByIdAndUpdate(
    id,
    { isBooked: 'canceled' },
    { new: true },
  ).populate('facility')
  return result
}

export const BookingService = {
  createBookingIntoDB,
  checkAvailabilityFromDB,
  getAllBookingsFromDB,
  getUserBookingsFromDB,
  cancelABookingFromDB,
}
