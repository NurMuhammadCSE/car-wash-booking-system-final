import { z } from "zod";

const createBooking = z.object({
  body: z.object({
    serviceId: z.string({
      required_error: "Service ID is required",
    }),
    slotId: z.string({
      required_error: "Slot ID is required",
    }),
    // vehicleType: z.enum(
    //   [
    //     "car",
    //     "truck",
    //     "SUV",
    //     "van",
    //     "motorcycle",
    //     "bus",
    //     "electricVehicle",
    //     "hybridVehicle",
    //     "bicycle",
    //     "tractor",
    //   ],
    //   {
    //     required_error: "Vehicle type is required",
    //   }
    // ),
    // vehicleBrand: z.string({
    //   required_error: "Vehicle brand is required",
    // }),
    // vehicleModel: z.string({
    //   required_error: "Vehicle model is required",
    // }),
    // manufacturingYear: z.number({
    //   required_error: "Manufacturing year is required",
    // }),
    // registrationPlate: z.string({
    //   required_error: "Registration plate is required",
    // }),
  }),
});

export const bookingValidation = {
  createBooking,
};
