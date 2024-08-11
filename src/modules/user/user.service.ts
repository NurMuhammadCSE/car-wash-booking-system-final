import { TUser } from "./user.interface";
import { User } from "./user.model";

const createAdmin = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

export const UserServices = {
  createAdmin,
};
