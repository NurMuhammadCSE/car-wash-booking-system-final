import express from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { ServiceRoutes } from "../modules/service/service.routes";
import { SlotRoutes } from "../modules/slot/slot.routes";
import { bookingRoutes } from "../modules/booking/booking.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/services",
    route: ServiceRoutes,
  },
  {
    path: "/slots",
    route: SlotRoutes,
  },
  {
    path: "/",
    route: bookingRoutes,
  },
];

moduleRoutes.forEach((e) => router.use(e.path, e.route));

export default router;
