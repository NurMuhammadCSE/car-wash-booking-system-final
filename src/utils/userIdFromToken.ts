/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import { Request } from "express";
import httpStatus from "http-status";
import AppError from "../errors/AppError";
import config from "../config";

const getUserIdFromToken = (req: Request): string => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Unauthorized");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, config.jwt_secret as string) as any;
    console.log(decoded.sub)
    return decoded.sub;
  } catch {
    throw new AppError(httpStatus.UNAUTHORIZED, "Invalid token");
  }
};

export default getUserIdFromToken;
