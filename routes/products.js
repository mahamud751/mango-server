import express from "express";
import {
  CreateProducts,
  deleteProducts,
  getProducts,
  getSingleProducts,
  updateProducts,
} from "../controllers/products.js";

const router = express.Router();

router.post("/", CreateProducts);
router.get("/", getProducts);
router.get("/:id", getSingleProducts);
router.delete("/:id", deleteProducts);
router.put("/:id", updateProducts);

export default router;
