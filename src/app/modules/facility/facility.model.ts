import { Schema, model } from 'mongoose'
import { IFacility } from './facility.interface'

const facilitySchema = new Schema<IFacility>({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  pricePerHour: {
    type: Number,
  },
  location: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
})

//query middleware
facilitySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})
facilitySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})
facilitySchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})

export const Facility = model<IFacility>('Facility', facilitySchema)
