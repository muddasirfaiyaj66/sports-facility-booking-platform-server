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
  isDeleted:{
    type:Boolean,
    default:false
  }
})



export const Facility = model<IFacility>('Facility', facilitySchema)
