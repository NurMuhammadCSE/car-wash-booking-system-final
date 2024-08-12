import express from "express";
import { bookingController } from "./booking.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { bookingValidation } from "./booking.validation";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(bookingValidation.createBooking),
  bookingController.createBooking
);

router.get("/", auth(USER_ROLE.admin), bookingController.getAllBookings);

router.get(
  "/my-bookings",
  auth(USER_ROLE.user),
  bookingController.getUserBookings
);

export const bookingRoutes = router;
