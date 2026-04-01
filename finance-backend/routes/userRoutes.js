import express from "express";
import {
  register,
  login,
  getUsers
} from "../controllers/userController.js";

import { auth } from "../middleware/authmiddleware.js";
import { authorize } from "../middleware/rolemiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", auth, authorize("admin"), getUsers);

export default router;