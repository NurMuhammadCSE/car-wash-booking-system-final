import httpStatus from "http-status";
import AppError from "../../../errors/AppError";
import { TService } from "./service.interface";
import { Service } from "./service.model";

const createService = async (payload: TService) => {
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
  const result = await Service.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteService = async (id: string) => {
  const service = await Service.findById(id);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service is not Found");
  }
  const result = await Service.findByIdAndDelete(id);
  return result;
};

export const serviceServices = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
