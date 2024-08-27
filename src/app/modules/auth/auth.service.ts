/* eslint-disable @typescript-eslint/no-unused-vars */
import jwt from "jsonwebtoken";
import httpStatus from "http-status";
import { User } from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { TUser } from "../user/user.interface";
import { isPasswordMatched } from "./auth.util";
import AppError from "../../../errors/AppError";
import config from "../../../config";

const signUp = async (payload: TUser) => {
  const userExist = await User.findOne({ email: payload.email }).select(
    "+password"
  );
  if (userExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exists");
  }
  payload.role = "user";
  const result = await User.create(payload);

  const { password, ...userWithoutPassword } = result.toObject();

  return userWithoutPassword;
};

const login = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email }).select("+password");
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }

  const passwordMatch = await isPasswordMatched(
    payload.password,
    user.password
  );

  if (!passwordMatch) {
    throw new AppError(httpStatus.NOT_FOUND, "Password Not Matched");
  }

  const jwtPayload = {
    userId: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  console.log(jwtPayload)

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in,
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: config.jwt_refresh_expires_in,
    }
  );

  const { password, ...userWithoutPassword } = user.toObject();

  return {
    accessToken,
    refreshToken,
    user: userWithoutPassword,
  };
};

export const authServices = {
  signUp,
  login,
};
