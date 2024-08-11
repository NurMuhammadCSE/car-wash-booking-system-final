import express from "express";
import { authController } from "./auth.controller";
import validateRequest from "../../middlewares/validateRequest";
import { authValidation } from "./auth.validation";

const router = express.Router();

router.post(
  "/signup",
  authController.signUp
);

router.post(
  "/login",
  validateRequest(authValidation.loginUser),
  authController.login
);

export const AuthRoutes = router;
