import { Types } from "mongoose";

export type TService = {
  _id: Types.ObjectId;
  name: string;
  image?: string;
  description: string;
  price: number;
  duration: number;
  isDeleted: boolean;
};
