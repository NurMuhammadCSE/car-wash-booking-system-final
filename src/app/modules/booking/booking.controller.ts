import httpStatus from "http-status";
import { catchAsync } from "../../../utils/catchAsync";
import sendResponse from "../../../utils/sendResponse";
import { bookingServices } from "./booking.service";

const createBooking = catchAsync(async (req, res) => {

  const result = await bookingServices.createBooking(req.body, req.userId);
  
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking successful",
    data: result,
  });
});

export const bookingController = {
    createBooking
}