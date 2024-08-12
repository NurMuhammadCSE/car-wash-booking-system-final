import z from "zod";

const createSlot = z.object({
  body: z.object({
    service: z.string({
      required_error: "Service ID is required",
    }),
    date: z.string({
      required_error: "Date is required",
    }),
    startTime: z.string({
      required_error: "Start time is required",
    }),
    endTime: z.string({
      required_error: "End time is required",
    }),
    isBooked: z.enum(["available", "booked", "cancel"], {
      required_error: "Booking status is required",
    }),
  }),
});

export const slotValidation = {
  createSlot,
};
