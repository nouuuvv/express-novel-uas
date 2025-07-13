import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import novelRoutes from "./routes/novelRoutes.js";

import User from "./models/User.js";
import Novel from "./models/Novel.js";

import bcrypt from "bcryptjs";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/novels", novelRoutes);

sequelize
  .sync()
  .then(async () => {
    console.log("✅ Database & tabel sudah siap!");

    // Cek admin, kalau belum ada → buat
    const admin = await User.findOne({ where: { role: "admin" } });

    if (!admin) {
      const salt = bcrypt.genSaltSync(10);
      const hashed = bcrypt.hashSync("admin123", salt);

      await User.create({
        name: "Super Admin",
        email: "admin@example.com",
        password: hashed,
        role: "admin",
      });

      console.log(
        "✅ Admin default dibuat! email: admin@example.com | pass: admin123"
      );
    } else {
      console.log("✅ Admin sudah ada.");
    }
  })
  .catch((err) => {
    console.error("❌ Gagal sinkronisasi DB:", err);
  });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server berjalan di port ${PORT}`));
