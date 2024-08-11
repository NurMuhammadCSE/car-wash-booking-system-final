import httpStatus from "http-status";
import AppError from "../../../errors/AppError";
import { Service } from "../service/service.model";
import { TSlot } from "./slot.interface";
import { Slot } from "./slot.mode";

const createSlot = async (payload: TSlot) => {
  const service = await Service.findById(payload.service);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, "Service is Not Found");
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

  // Generate the slots
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
    const endHourStr = String(Math.floor(currentEndTime / 60)).padStart(2, "0");
    const endMinuteStr = String(currentEndTime % 60).padStart(2, "0");

    const slot = await Slot.create({
      service: payload.service,
      date: payload.date,
      startTime: `${startHourStr}:${startMinuteStr}`,
      endTime: `${endHourStr}:${endMinuteStr}`,
      isBooked: "available",
    });

    slots.push(slot);
    currentStartTime = currentEndTime;
  }

  return slots;
};

const getAllSlots = async () => {
  const result = await Slot.find();
  return result;
};

const getSingleSlot = async (id: string) => {
  const result = await Slot.findById(id);
  return result;
};

const updateSlot = async (id: string, payload: Partial<TSlot>) => {
  const result = await Slot.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteSlot = async (id: string) => {
  const result = await Slot.findByIdAndDelete(id);
  return result;
};

export const SlotServices = {
  createSlot,
  getAllSlots,
  getSingleSlot,
  updateSlot,
  deleteSlot,
};
