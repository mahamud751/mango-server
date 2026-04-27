import express from "express";
import {
  createUser,
  deleteUser,
  getAdmin,
  getJWT,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

router.post("/", createUser);
router.put("/:email", updateUser);
router.delete("/:id", deleteUser);

router.get("/", getUsers);
router.get("/jwt", getJWT);
router.get("/admin/:email", getAdmin);
router.get("/:id", getUser);

export default router;
