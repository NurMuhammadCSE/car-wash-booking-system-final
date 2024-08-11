import { model, Schema } from "mongoose";
import { TService } from "./service.interface";

const serviceSchema = new Schema<TService>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Query Middleware
serviceSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

serviceSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

serviceSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

export const Service = model<TService>("Service", serviceSchema);
