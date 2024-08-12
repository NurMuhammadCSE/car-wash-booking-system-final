import express from "express";
import { UserController } from "./user.controller";
import { UserValidations } from "./user.validation";
import { USER_ROLE } from "./user.constant";
import validateRequest from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/create-admin",
  validateRequest(UserValidations.createUser),
  auth(USER_ROLE.admin),
  UserController.createAdmin
);

export const UserRoutes = router;
