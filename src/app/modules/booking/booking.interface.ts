import { ObjectId } from "mongoose";

export type TBooking = {
  customer: ObjectId;
  serviceId: ObjectId;
  slotId: ObjectId;
  vehicleType:
    | "car"
    | "truck"
    | "SUV"
    | "van"
    | "motorcycle"
    | "bus"
    | "electricVehicle"
    | "hybridVehicle"
    | "bicycle"
    | "tractor";
  vehicleBrand: string;
  vehicleModel: string;
  manufacturingYear: string;
  registrationPlate: string;
};
