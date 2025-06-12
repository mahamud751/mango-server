import express from "express";
import {
  createUser,
  getAdmin,
  getJWT,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

router.post("/", createUser);
router.put("/:email", updateUser);

router.get("/", getUsers);
router.get("/:id", getUser);
router.get("/jwt", getJWT);
router.get("/admin/:email", getAdmin);

export default router;
