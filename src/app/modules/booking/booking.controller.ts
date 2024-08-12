import httpStatus from "http-status";
import { catchAsync } from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { bookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {
  const userId = req.userId;
  const result = await bookingServices.createBooking(req.body, userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking successful",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req, res) => {
  const result = await bookingServices.getAllBookings();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All bookings retrieved successfully",
    data: result,
  });
});

const getUserBookings = catchAsync(async (req, res) => {

  const userId = req.userId; // Assuming req.user is set by the auth middleware
  const result = await bookingServices.getUserBookings(userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User bookings retrieved successfully",
    data: result,
  });
});

export const bookingController = {
  createBooking,
  getAllBookings,
  getUserBookings,
};
