import express from 'express'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'
import { BookingController } from './booking.controller'

const router = express.Router()

router.post('/bookings', auth(USER_ROLE.user), BookingController.createBooking)
router.get('/check-availability', BookingController.checkAvailability)

export const BookingRoutes = router