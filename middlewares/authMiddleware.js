import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware proteksi: validasi token JWT
export const protect = async (req, res, next) => {
  let token;

  console.log("HEADERS:", req.headers); // Debug: lihat header di terminal

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Pisahkan Bearer + token
      token = req.headers.authorization.split(" ")[1];
      console.log("TOKEN:", token);

      // Verifikasi token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Cari user di DB
      req.user = await User.findByPk(decoded.id);

      if (!req.user) {
        return res.status(401).json({ msg: "User tidak ditemukan!" });
      }

      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({ msg: "Token tidak valid!" });
    }
  } else {
    return res.status(401).json({ msg: "Tidak ada token!" });
  }
};

// Middleware role admin-only
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ msg: "Akses ditolak, hanya admin!" });
  }
};
