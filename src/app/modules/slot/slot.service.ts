/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status";
import AppError from "../../../errors/AppError";
import { Service } from "../service/service.model";
import { TSlot } from "./slot.interface";
import { Slot } from "./slot.mode";
import mongoose from "mongoose";

const createSlot = async (payload: TSlot) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const service = await Service.findById(payload.service).session(session);
    if (!service) {
      throw new AppError(httpStatus.NOT_FOUND, "Service is not found");
    }

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
    const numberOfSlots = totalDuration / serviceDuration;

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
  const filter: any = { isBooked: "available" };
  if (date) {
    filter.date = new Date(date);
  }

  if (serviceId) {
    filter.service = serviceId;
  }

  const slots = await Slot.find(filter).populate("service");
  return slots;
};

export const SlotServices = {
  createSlot,
  getAllSlots,
};
