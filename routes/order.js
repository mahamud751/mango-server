import express from "express";
import { createOrder, getMyBooking, getOrder } from "../controllers/order.js";

const router = express.Router();

router.post("/", createOrder);

router.get("/", getOrder);
router.get("/s", getMyBooking);

export default router;
