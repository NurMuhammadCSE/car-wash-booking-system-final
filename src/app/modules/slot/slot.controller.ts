import httpStatus from "http-status";
import { SlotServices } from "./slot.service";
import { catchAsync } from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";

const createSlot = catchAsync(async (req, res) => {

  const result = await SlotServices.createSlot(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slot is Created Successfully",
    data: result,
  });
});
const getAllSlots = catchAsync(async (req, res) => {
  const result = await SlotServices.getAllSlots();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slot is Created Successfully",
    data: result,
  });
});
const getSingleSlot = catchAsync(async (req, res) => {
  const { SlotId } = req.params;
  const result = await SlotServices.getSingleSlot(SlotId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slot is Created Successfully",
    data: result,
  });
});
const updateSlot = catchAsync(async (req, res) => {
  const { serviceId } = req.params;

  const result = await SlotServices.updateSlot(serviceId, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service is Created Successfully",
    data: result,
  });
});
const deleteSlot = catchAsync(async (req, res) => {
  const { serviceId } = req.params;
  const result = await SlotServices.deleteSlot(serviceId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Service is Created Successfully",
    data: result,
  });
});

export const SlotController = {
  createSlot,
  getAllSlots,
  getSingleSlot,
  updateSlot,
  deleteSlot,
};
