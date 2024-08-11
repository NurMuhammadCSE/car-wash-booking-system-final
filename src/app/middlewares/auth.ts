import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../modules/user/user.model";
import { USER_ROLE } from "../modules/user/user.constant";
import { catchAsync } from "../../utils/catchAsync";
import AppError from "../../errors/AppError";
import config from "../../config";

export const auth = (...requiredRoles: (keyof typeof USER_ROLE)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.headers.authorization;

    if (!accessToken) {
      throw new AppError(401, "You are not authorized to access this route");
    }

    const verfiedToken = jwt.verify(
      accessToken as string,
      config.jwt_access_secret as string
    );

    const { role, email } = verfiedToken as JwtPayload;

    const user = await User.findOne({ email });

    if (!user) {
      throw new AppError(401, "User not found");
    }

    if (!requiredRoles.includes(role)) {
      throw new AppError(401, "You are not authorized to access this route");
    }

    next();
  });
};