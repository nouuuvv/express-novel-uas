// controllers/authController.js
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Cek apakah email sudah terdaftar
    const exist = await User.findOne({ where: { email } });
    if (exist) return res.status(400).json({ msg: "Email sudah digunakan!" });

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(password, salt);

    // Buat user baru
    await User.create({ name, email, password: hashed });

    res.status(201).json({ msg: "Registrasi berhasil!" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Cek user
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan!" });

    // Cek password
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Password salah!" });

    // Generate JWT
    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
      

    res.json({
      msg: "Login berhasil",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error", err });
  }
};
