import httpStatus from "http-status";
import AppError from "../../../errors/AppError";
import { TService } from "./service.interface";
import { Service } from "./service.model";
import mongoose from "mongoose";

const createService = async (payload: TService) => {
  const isExist = await Service.findOne({ name: payload.name });
  if (isExist) {
    throw new AppError(httpStatus.CONFLICT, "This Service is Already Exist");
  }

  const result = await Service.create(payload);
  return result;
};

const getAllServices = async () => {
  const result = await Service.find();
  return result;
};

const getSingleService = async (id: string) => {
  const service = await Service.findById(id);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service is not Found");
  }
  return service;
};

const updateService = async (id: string, payload: Partial<TService>) => {
  const service = await Service.findById(id);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service is not Found");
  }

  const isExist = await Service.findOne({ name: payload.name });
  if (isExist) {
    throw new AppError(httpStatus.CONFLICT, "This Service is Already Exist");
  }

  const result = await Service.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

// const deleteService = async (id: string) => {
//   const service = await Service.findById(id);
//   if (!service) {
//     throw new AppError(httpStatus.NOT_FOUND, "Service is not Found");
//   }
//   // const result = await Service.findByIdAndDelete(id);

//   service.isDeleted = true;
//   const result = await service.save();

//   return result;
// };

const deleteService = async (id: string) => {
  const service = await Service.findById(id);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service is not Found");
  }
  
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Set isDeleted to true for the service
    const service = await Service.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );

    await session.commitTransaction();
    await session.endSession();

    return service;
  } catch (err) {
    console.error(err);
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(httpStatus.NOT_FOUND, "Service not found");
  }
};

export const serviceServices = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
