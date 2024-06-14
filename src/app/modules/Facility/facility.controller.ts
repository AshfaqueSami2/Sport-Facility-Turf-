import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { FacilityServices } from './facility.service';

//create facility
const createFacility = catchAsync(async (req, res) => {
  const facilityData = req.body;

  const result = await FacilityServices.createFacilityIntoDB(facilityData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility Create successfully',
    data: result,
  });
});

//get all facility
const getAllFacilites = catchAsync(async (req, res) => {
  const result = await FacilityServices.getAllFacilitiesFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facilities retrieved successfully',
    data: result,
  });
});

//updateFacility

const updateFacility = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await FacilityServices.updateFacilityIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facility is updated succesfully',
    data: result,
  });
});

export const FacilityController = {
  createFacility,
  getAllFacilites,
  updateFacility,
};
