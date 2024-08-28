import express from "express";
import { SlotController } from "./slot.controller";
import { auth } from "../../middlewares/auth";
import { USER_ROLE } from "../user/user.constant";

const router = express.Router();

router.get("/availability", SlotController.getAllSlots);
router.get("/availability/:slotId", SlotController.getSingleSlot);
router.patch(
  "/:slotId",
  auth(USER_ROLE.admin),
  SlotController.updateSlotStatus
);

export const SlotRoutes = router;
