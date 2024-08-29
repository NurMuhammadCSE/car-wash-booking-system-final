// src/models/Review.ts
import mongoose, { Schema } from "mongoose";

export type TReview = {
  userId: mongoose.Types.ObjectId;
//   serviceId: mongoose.Types.ObjectId;
  rating: number;
  feedback: string;
  createdAt?: Date;
  updatedAt?: Date;
};

const reviewSchema: Schema = new Schema<TReview>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // serviceId: { type: Schema.Types.ObjectId, ref: "Service", required: true },
    rating: { type: Number, min: 1, max: 5, required: true },
    feedback: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model<TReview>("Review", reviewSchema);

export default Review;
