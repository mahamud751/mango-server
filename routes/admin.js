import express from "express";
import { createAdmin, getJWT } from "../controllers/admin.js";

const router = express.Router();

router.post("/", createAdmin);

router.get("/jwt", getJWT);

export default router;
