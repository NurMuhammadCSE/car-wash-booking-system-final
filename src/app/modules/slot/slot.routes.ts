import express from "express";
import { SlotController } from "./slot.controller";

const router = express.Router();

router.post("/create-service", SlotController.createSlot);

router.patch("/:serviceId", SlotController.updateSlot);

router.delete("/:serviceId", SlotController.deleteSlot);

router.get("/services", SlotController.getAllSlots);

router.get("/:serviceId", SlotController.getSingleSlot);

export const SlotRoutes = router;
