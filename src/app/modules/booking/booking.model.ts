import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Service",
    },
    slotId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Slot",
    },
    vehicleType: {
      type: String, // Adding type for the vehicleType field
      enum: [
        "car",
        "truck",
        "SUV",
        "van",
        "motorcycle",
        "bus",
        "electricVehicle",
        "hybridVehicle",
        "bicycle",
        "tractor",
      ],
      required: true,
    },
    vehicleBrand: {
      type: String,
      required: true,
    },
    vehicleModel: {
      type: String,
      required: true,
    },
    manufacturingYear: {
      type: String,
      required: true,
    },
    registrationPlate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // Add this option to automatically manage createdAt and updatedAt fields
  }
);

export const Booking = model<TBooking>("Booking", bookingSchema);
