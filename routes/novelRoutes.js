// routes/novelRoutes.js
import express from "express";
import {
  getAllNovels,
  getNovelById,
  createNovel,
  updateNovel,
  deleteNovel,
} from "../controllers/novelController.js";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getAllNovels); // Guest bisa lihat
router.get("/:id", protect, getNovelById); // Detail, wajib login

router.post("/", protect, adminOnly, createNovel); // Admin only
router.put("/:id", protect, adminOnly, updateNovel); // Admin only
router.delete("/:id", protect, adminOnly, deleteNovel); // Admin only

export default router;
