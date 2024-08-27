import { join } from "path";
import { verifyPayment } from "./payment.utils";
import { readFileSync } from "fs";
import { Slot } from "../slot/slot.mode";

const confirmationService = async (transactionId: string) => {
  //   const verifyResponse = await verifyPayment(transactionId);
  //   console.log(verifyResponse);

  const result = await Slot.findOneAndUpdate(
    { transactionId },
    {
      isBooked: "booked",
    },
    { new: true }
  );

  return result;
};

export const paymentServices = {
  confirmationService,
};
