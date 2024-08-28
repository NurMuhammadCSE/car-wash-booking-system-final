import { ObjectId } from "mongoose";

export type TSlot = {
  service: ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: "available" | "booked" | "cancelled";
};
