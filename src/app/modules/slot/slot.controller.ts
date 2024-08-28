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
  const { date, serviceId } = req.query;
  const result = await SlotServices.getAllSlots(
    date as string,
    serviceId as string
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Available slots retrieved successfully",
    data: result,
  });
});
const getSingleSlot = catchAsync(async (req, res) => {
  const { slotId } = req.params;
  const result = await SlotServices.getSingleSlot(slotId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Available slots retrieved successfully",
    data: result,
  });
});

const updateSlotStatus = catchAsync(async (req, res) => {
  const { slotId } = req.params;
  const { isBooked } = req.body;

  const result = await SlotServices.updateSlotStatus(slotId, isBooked);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Slot status updated successfully",
    data: result,
  });
});


export const SlotController = {
  createSlot,
  getAllSlots,
  getSingleSlot,
  updateSlotStatus,
};
