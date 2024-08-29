import httpStatus from "http-status";
import { catchAsync } from "../../../utils/catchAsync";
import { reviewService } from "./review.service";
import { Request, Response } from "express";
import sendResponse from "../../../utils/sendResponse";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await reviewService.createReview(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: "User is created successfully",
    data: result,
  });
});

const getAllReviews = catchAsync(async (req: Request, res: Response) => {
  const review = await reviewService.getAllReviews();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "review retrieved successfully",
    data: review,
  });
});

export const reviewController = {
  createReview,
  getAllReviews,
};
