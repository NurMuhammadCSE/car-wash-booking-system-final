import { Request, Response } from "express";
import { paymentServices } from "./payment.service";

const confirmationController = async (req: Request, res: Response) => {
  const { transactionId } = req.query;

  const result = await paymentServices.confirmationService(
    transactionId as string
  );

  res.send(`
    <div style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #f0fdf4;">
      <div style="background-color: white; padding: 2rem; border-radius: 1rem; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); text-align: center;">
        <h1 style="font-size: 2rem; font-weight: bold; color: #16a34a; margin-bottom: 1rem;">Payment Successful!</h1>
        <p style="color: #4b5563; margin-bottom: 2rem;">Thank you for your payment. Your booking has been confirmed.</p>
        <div style="display: flex; justify-content: center; margin-bottom: 1.5rem;">
          <svg style="width: 4rem; height: 4rem; color: #16a34a;" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <a href="https://car-washing-booking.web.app/" style="background-color: #16a34a; color: white; padding: 0.5rem 1.5rem; border-radius: 0.375rem; text-decoration: none; display: inline-block; transition: background-color 0.2s;">
          Go to Home
        </a>
      </div>
    </div>
  `);
};

export const paymentController = {
  confirmationController,
};
