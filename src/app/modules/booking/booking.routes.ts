import express from "express";
import { bookingController } from "./booking.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.post("/", auth(USER_ROLE.user), bookingController.createBooking);

export const bookingRoutes = router;
