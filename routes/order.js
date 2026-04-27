import express from "express";
import {
  createOrder,
  deleteOrder,
  getMyBooking,
  getOrder,
  getSingleOrder,
  updateOrder,
} from "../controllers/order.js";

const router = express.Router();

router.post("/", createOrder);

router.get("/", getOrder);
router.get("/s", getMyBooking);
router.get("/:id", getSingleOrder);
router.put("/:id", updateOrder);
router.delete("/:id", deleteOrder);

export default router;
