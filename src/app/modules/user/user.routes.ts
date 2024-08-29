import express from "express";
import { UserController } from "./user.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "./user.constant";

const router = express.Router();

router.post("/create-user", UserController.createUser);
router.get("/", auth(USER_ROLE.admin), UserController.getAllUsers);
router.patch("/:userId", auth(USER_ROLE.admin), UserController.updateUserRole);

export const UserRoutes = router;
