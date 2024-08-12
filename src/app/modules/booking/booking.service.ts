import httpStatus from "http-status";
import AppError from "../../../errors/AppError";
import { Service } from "../service/service.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { Slot } from "../slot/slot.mode";
import { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";
import mongoose from "mongoose";

const createBooking = async (payload: TBooking, userId: JwtPayload) => {
  // Validate the service exists
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const service = await Service.findById(payload.serviceId).session(session);
    if (!service) {
      throw new AppError(httpStatus.NOT_FOUND, "Service not found");
    }

    // Validate the user exists
    const userExists = await User.findById(userId).session(session);
    if (!userExists) {
      throw new AppError(httpStatus.NOT_FOUND, "User not found");
    }

    // Validate the slot exists
    const slot = await Slot.findById(payload.slotId).session(session);
    if (!slot) {
      throw new AppError(httpStatus.NOT_FOUND, "Slot not found");
    }

    // Ensure the slot is available
    if (slot.isBooked !== "available") {
      throw new AppError(httpStatus.BAD_REQUEST, "Slot is already booked");
    }

    // Update slot status to booked
    slot.isBooked = "booked";
    await slot.save();

    // Create the booking
    const bookingPayload = { ...payload, customer: userId };
    const booking = await Booking.create(bookingPayload);

    // Populate related fields
    const populatedBooking = await booking.populate([
      {
        path: "customer",
        select: "_id name email phone address",
      },
      {
        path: "service",
        select: "_id name description price duration isDeleted",
      },
      {
        path: "slot",
        select: "_id service date startTime endTime isBooked",
      },
    ]);

    //! Every Property Printed
    // const populatedBooking = (
    //   await (await booking.populate("customer")).populate("service")
    // ).populate("slot");

    await session.commitTransaction();
    await session.endSession();
    return populatedBooking;
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    session.endSession();
    throw new Error("Failed to create booking");
  }
};

const getAllBookings = async () => {
  const result = await Booking.find().populate([
    {
      path: "customer",
      select: "_id name email phone address",
    },
    {
      path: "service",
      select: "_id name description price duration isDeleted",
    },
    {
      path: "slot",
      select: "_id service date startTime endTime isBooked",
    },
  ]);

  return result;
};

const getUserBookings = async (userId: string) => {
  const bookings = await Booking.find({ customer: userId })
    .populate({
      path: "service",
      select: "_id name description price duration isDeleted",
    })
    .populate({
      path: "slot",
      select: "_id service date startTime endTime isBooked",
    });

  return bookings;
};

export const bookingServices = {
  createBooking,
  getAllBookings,
  getUserBookings,
};
