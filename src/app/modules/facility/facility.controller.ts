import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { FacilityService } from './facility.service'

const createFacility = catchAsync(async (req, res) => {
  const result = await FacilityService.createFacilityIntoDB(req.body)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Facility added successfully',
    data: result,
  })
})

const getAllFacility = catchAsync(async (req, res) => {
  const result = await FacilityService.getAllFacilityFromDB()
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Facilities retrieved successfully',
    data: result,
  })
})
const getSingleFacility = catchAsync(async (req, res) => {
  const id = req.params.id
  const result = await FacilityService.getSingleFacilityFromDB(id)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Facility retrieved successfully',
    data: result,
  })
})

const updateFacility = catchAsync(async (req, res) => {
  const id = req.params.id
  const updatedData = req.body
  const result = await FacilityService.updateFacilityIntoDB(id, updatedData)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Facility updated successfully',
    data: result,
  })
})
const deleteFacility = catchAsync(async (req, res) => {
  const id = req.params.id

  const result = await FacilityService.deleteFacilityIntoDB(id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Facility deleted successfully',
    data: result,
  })
})

export const FacilityController = {
  createFacility,
  updateFacility,
  deleteFacility,
  getAllFacility,
  getSingleFacility,
}
