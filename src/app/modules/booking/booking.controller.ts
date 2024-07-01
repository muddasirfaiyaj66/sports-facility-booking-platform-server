import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { BookingService } from './booking.service'

const createBooking = catchAsync(async (req, res) => {
  const payload = req.body
  const user = req.user._id

  const result = await BookingService.createBookingIntoDB(payload, user)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Booking created successfully',
    data: result,
  })
})

const checkAvailability = catchAsync(async (req, res) => {
  const dateParam = req.query.date
  const date = dateParam ? new Date(dateParam as string) : new Date()
  const formattedDate = date.toISOString().split('T')[0]

  const result = await BookingService.checkAvailabilityFromDB(formattedDate)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Availability checked successfully',
    data: result,
  })
})

export const BookingController = {
  createBooking,
  checkAvailability,
}
