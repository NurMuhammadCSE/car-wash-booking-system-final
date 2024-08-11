import httpStatus from "http-status";
import AppError from "../../../errors/AppError";
import { Service } from "../service/service.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { Slot } from "../slot/slot.mode";

const createBooking = async (payload: TBooking) => {
  // Validate service
  const service = await Service.findById(payload.serviceId);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found");
  }

  // Validate slot
  const slot = await Slot.findById(payload.slotId);
  if (!slot) {
    throw new AppError(httpStatus.NOT_FOUND, "Slot not found");
  }

  // Ensure that the slot is available before booking
  if (slot.isBooked !== "available") {
    throw new AppError(httpStatus.BAD_REQUEST, "Slot is already booked");
  }

  // Update the slot status to booked
  slot.isBooked = "booked";
  await slot.save();

  // Create the booking with the customer (user) ID
  // const bookingPayload = { ...payload, customer: userId.sub };
  const booking = await Booking.create(payload);

  // Populate related fields
  const populatedBooking = await booking.populate([
    {
      path: "customer",
      select: "_id name email phone address",
    },
    {
      path: "serviceId",
      select: "_id name description price duration isDeleted",
    },
    {
      path: "slotId",
      select: "_id service date startTime endTime isBooked",
    },
  ]);

  return populatedBooking;
};

const getAllBookings = async() => {
  const result = await Booking.find();
  return result;
}

export const bookingServices = {
  createBooking,
  getAllBookings
};
