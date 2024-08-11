import { model, Schema } from "mongoose";
import { TSlot } from "./slot.interface";

const slotSchema = new Schema<TSlot>(
  {
    service: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    isBooked:{
      type:String,
      required: true,
      enum: ["available", "booked", "cancel"], // Corrected enum syntax
    }
  },
  {
    timestamps: true,
  }
);

export const Slot = model<TSlot>("Slot", slotSchema);
