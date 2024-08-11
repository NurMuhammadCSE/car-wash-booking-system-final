import httpStatus from "http-status";
import { UserServices } from "./user.service";
import { catchAsync } from "../../../utils/catchAsync";

const createAdmin = catchAsync(async (req, res) => {
  const result = await UserServices.createAdmin(req.body);

  res.status(httpStatus.OK).json({
    success: true,
    message: "Admin is created Successfully",
    data: result,
  });
});

export const UserController = {
  createAdmin,
};
