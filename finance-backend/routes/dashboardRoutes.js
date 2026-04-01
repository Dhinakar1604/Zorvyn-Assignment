import express from "express";
import { summary } from "../controllers/dashboardController.js";

import { auth } from "../middleware/authmiddleware.js";
import { authorize } from "../middleware/rolemiddleware.js";

const router = express.Router();

router.get("/summary", auth, authorize("admin", "analyst", "viewer"), summary);

export default router;