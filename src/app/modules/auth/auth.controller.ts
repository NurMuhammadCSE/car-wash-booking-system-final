import { json } from "express";
import { authServices } from "./auth.service";
import httpStatus from "http-status";
import { catchAsync } from "../../../utils/catchAsync";
import config from "../../../config";

const signUp = catchAsync(async (req, res) => {
  const result = await authServices.signUp(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const { refreshToken, accessToken, user } = await authServices.login(
    req.body
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
  });

  res.status(httpStatus.OK).json({
    success: true,
    message: "User Login Successfully",
    token: accessToken,
    data: user,
  });
});

export const authController = {
  signUp,
  login,
};
