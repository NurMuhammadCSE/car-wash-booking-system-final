import httpStatus from "http-status";
import { serviceServices } from "./service.service";
import { catchAsync } from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

const createService = catchAsync(async (req, res) => {
  const result = await serviceServices.createService(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service is Created Successfully",
    data: result,
  });
});
const getAllServices = catchAsync(async (req, res) => {
  const result = await serviceServices.getAllServices();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Services retrieved successfully",
    data: result,
  });
});

const getSingleService = catchAsync(async (req, res) => {
  const { serviceId } = req.params;
  const result = await serviceServices.getSingleService(serviceId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service retrieved successfully",
    data: result,
  });
});
const updateService = catchAsync(async (req, res) => {
  const { serviceId } = req.params;

  const result = await serviceServices.updateService(serviceId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service updated Successfully",
    data: result,
  });
});

const deleteService = catchAsync(async (req, res) => {
  const { serviceId } = req.params;
  const result = await serviceServices.deleteService(serviceId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service is Created Successfully",
    data: result,
  });
});

export const serviceController = {
  createService,
  getAllServices,
  getSingleService,
  updateService,
  deleteService,
};
