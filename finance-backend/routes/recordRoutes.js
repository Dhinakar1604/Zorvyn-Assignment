import express from "express";
import {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord
} from "../controllers/recordController.js";

import { auth } from "../middleware/authmiddleware.js";
import { authorize } from "../middleware/rolemiddleware.js";

const router = express.Router();

router.post("/", auth, authorize("admin"), createRecord);
router.get("/", auth, authorize("admin", "analyst", "viewer"), getRecords);
router.put("/:id", auth, authorize("admin"), updateRecord);
router.delete("/:id", auth, authorize("admin"), deleteRecord);

export default router;