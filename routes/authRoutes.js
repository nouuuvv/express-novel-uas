// routes/authRoutes.js
import express from "express";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);

router.post("/logout", (req, res) => {
  // Frontend cukup hapus token di localStorage/cookie
  return res
    .status(200)
    .json({ msg: "Logout berhasil, token dihapus di frontend." });
});


export default router;
