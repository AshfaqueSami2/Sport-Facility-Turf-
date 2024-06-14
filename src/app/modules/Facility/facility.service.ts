import { TFacility } from './facility.interface';
import { Facility } from './facility.model';

//create facility
const createFacilityIntoDB = async (facilityData: TFacility) => {
  const newFacility = new Facility(facilityData);
  const result = await newFacility.save();
  return result;
};

//get all facility
const getAllFacilitiesFromDB = async () => {
  const result = await Facility.find();
  return result;
};

//updateFacility
const updateFacilityIntoDB = async (
  id: string,
  payload: Partial<TFacility>,
) => {
  const result = await Facility.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const FacilityServices = {
  createFacilityIntoDB,
  getAllFacilitiesFromDB,
  updateFacilityIntoDB,
};
