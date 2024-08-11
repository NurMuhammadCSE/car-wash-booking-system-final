import express from "express";
import { UserController } from "./user.controller";
import validateRequest from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post(
  "/create-admin",
  validateRequest(UserValidations.createAdmin),
  auth(USER_ROLE.ADMIN),
  UserController.createAdmin
);

export const UserRoutes = router;
