import express from "express";
import { SlotController } from "./slot.controller";

const router = express.Router();

router.get("/availability", SlotController.getAllSlots);
router.get("/availability/:slotId", SlotController.getSingleSlot);

export const SlotRoutes = router;