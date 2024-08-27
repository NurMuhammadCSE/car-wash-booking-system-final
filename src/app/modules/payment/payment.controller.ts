import { Request, Response } from "express";
import { paymentServices } from "./payment.service";

const confirmationController = async (req: Request, res: Response) => {
  const { transactionId } = req.query;

  const result = await paymentServices.confirmationService(
    transactionId as string
  );
  //   res.send(result);

  res.send(`<h1>Payment Success</h1>`);
};

export const paymentController = {
  confirmationController,
};
