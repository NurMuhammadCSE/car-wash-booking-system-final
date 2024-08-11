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
  const result = await Service.findById(id);
  return result;
};

const updateService = async (id: string, payload: Partial<TService>) => {
  const result = await Service.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteService = async (id: string) => {
  const result = await Service.findByIdAndUpdate(id);
  return result;
};

export const serviceServices = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
