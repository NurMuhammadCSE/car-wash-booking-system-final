import { model, Schema } from "mongoose";
import { TBooking } from "./booking.interface";

const bookingSchema = new Schema<TBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
    },
    slotId: {
      type: Schema.Types.ObjectId,
      ref: "Slot",
    },
    // vehicleType: {
    //   type: String,
    //   enum: [
    //     "car", "truck", "SUV", "van", "motorcycle", "bus",
    //     "electricVehicle", "hybridVehicle", "bicycle", "tractor"
    //   ],
    //   required: true,
    // },
    // vehicleBrand: {
    //   type: String,
    //   required: true,
    // },
    // vehicleModel: {
    //   type: String,
    //   required: true,
    // },
    // manufacturingYear: {
    //   type: Number,
    //   required: true,
    // },
    // registrationPlate: {
    //   type: String,
    //   required: true,
    // },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.serviceId;
        delete ret.slotId;   
        delete ret.__v;  
        return ret;
      }
    }
  }
);

// Virtual populate for service
bookingSchema.virtual('service', {
  ref: 'Service',
  localField: 'serviceId',
  foreignField: '_id',
  justOne: true,
});

// Virtual populate for slot
bookingSchema.virtual('slot', {
  ref: 'Slot',
  localField: 'slotId',
  foreignField: '_id',
  justOne: true,
});

export const Booking = model<TBooking>("Booking", bookingSchema);
