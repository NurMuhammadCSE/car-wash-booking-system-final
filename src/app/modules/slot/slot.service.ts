/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../../errors/AppError";
import { Service } from "../service/service.model";
import { TSlot } from "./slot.interface";
import { Slot } from "./slot.mode";
import mongoose from "mongoose";

const createSlot = async (payload: TSlot) => {
  const service = await Service.findById(payload.service);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service not found");
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // Assume service duration is in minutes (e.g., 60 minutes)
    const serviceDuration = service.duration;

    // Convert startTime and endTime to minutes since midnight
    const [startHour, startMinute] = payload.startTime.split(":").map(Number);
    const [endHour, endMinute] = payload.endTime.split(":").map(Number);

    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    // Calculate the total available duration
    const totalDuration = endTotalMinutes - startTotalMinutes;

    // Calculate the number of slots
    // const numberOfSlots = totalDuration / serviceDuration;
    const numberOfSlots = Math.floor(totalDuration / serviceDuration);

    const slots = [];
    let currentStartTime = startTotalMinutes;

    for (let i = 0; i < numberOfSlots; i++) {
      const currentEndTime = currentStartTime + serviceDuration;

      // Convert minutes back to HH:mm format
      const startHourStr = String(Math.floor(currentStartTime / 60)).padStart(
        2,
        "0"
      );
      const startMinuteStr = String(currentStartTime % 60).padStart(2, "0");
      const endHourStr = String(Math.floor(currentEndTime / 60)).padStart(
        2,
        "0"
      );
      const endMinuteStr = String(currentEndTime % 60).padStart(2, "0");

      const slotStartTime = `${startHourStr}:${startMinuteStr}`;
      const slotEndTime = `${endHourStr}:${endMinuteStr}`;

      // // Check for overlapping slots
      // const existingSlot = await Slot.findOne({
      //   service: payload.service,
      //   date: payload.date,
      //   startTime: { $lt: slotEndTime },
      //   endTime: { $gt: slotStartTime },
      // }).session(session);

      // if (existingSlot) {
      //   throw new AppError(
      //     httpStatus.CONFLICT,
      //     "Slot timing conflicts with an existing slot"
      //   );
      // }

      // Create the slot if no conflicts are found
      const slot = await Slot.create(
        [
          {
            service: payload.service,
            date: payload.date,
            startTime: slotStartTime,
            endTime: slotEndTime,
            isBooked: "available",
          },
        ],
        { session }
      );

      slots.push(slot[0]);
      currentStartTime = currentEndTime;
    }

    await session.commitTransaction();
    return slots;
  } catch (err) {
    console.log(err);
    await session.abortTransaction();
    throw new Error("Failed to create slots");
  } finally {
    session.endSession();
  }
};

const getAllSlots = async (date?: string, serviceId?: string) => {
  // const filter: any = { isBooked: "available" };
  const filter: any = {};

  if (date) {
    filter.date = new Date(date);
  }

  if (serviceId) {
    filter.service = serviceId;
  }

  const slots = await Slot.find(filter).populate("service");
  return slots;
};

const getSingleSlot = async (id: string) => {
  try {
    const slot = await Slot.findById(id).populate("service");
    if (!slot) {
      throw new Error("Slot not found");
    }
    return slot;
  } catch (error) {
    console.error("Error retrieving slot:", error);
    throw error;
  }
};

const updateSlotStatus = async (id: string, status: string) => {
  const slot = await Slot.findById(id);
  
  if (!slot) {
    throw new AppError(httpStatus.NOT_FOUND, "Slot not found");
  }

  // Check if the slot is already booked
  if (slot.isBooked === 'booked') {
    throw new AppError(httpStatus.BAD_REQUEST, "Cannot update a booked slot");
  }

  // Only allow status to be updated to 'available' or 'cancelled'
  if (status !== 'available' && status !== 'cancelled') {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid status update");
  }

  slot.isBooked = status;
  await slot.save();
  return slot;
};

export const SlotServices = {
  createSlot,
  getAllSlots,
  getSingleSlot,
  updateSlotStatus,
};
