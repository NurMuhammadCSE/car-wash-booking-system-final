import { TUser } from "./user.interface";
import { User } from "./user.model";
import { Booking } from "../booking/booking.model";
import httpStatus from "http-status";
import AppError from "../../../errors/AppError";

const createUser = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const getAllUsers = async () => {
  const users = await User.find().select("-password");
  return users;
};

const getUserBookings = async (userId: string) => {
  const bookings = await Booking.find({ user: userId }).populate("service");
  return bookings;
};

const updateUserRole = async (userId: string, role: string) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { role },
    { new: true, runValidators: true }
  );

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User not found");
  }

  return user;
};

export const UserServices = {
  createUser,
  getAllUsers,
  getUserBookings,
  updateUserRole,
};
