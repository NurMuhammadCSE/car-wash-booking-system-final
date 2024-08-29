import Review, { TReview } from "./review.model";

const createReview = async (payload: TReview) => {
  const result = await Review.create(payload);
  return result;
};

const getAllReviews = async () => {
  const users = await Review.find();
  return users;
};

export const reviewService = {
  createReview,
  getAllReviews,
};
