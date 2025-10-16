// backend/server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Cargar variables de entorno (.env)
dotenv.config();

const app = express();

// 🔧 Middlewares
app.use(cors());
app.use(express.json());

// 📦 Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Conectado a MongoDB Atlas (smart_tutor)"))
  .catch(err => console.error("❌ Error de conexión:", err));

// 📘 Esquema y Modelo de Usuario
const userSchema = new mongoose.Schema({
  dni: { type: String, required: true },
  name: { type: String, default: "" },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "tutor", "admin"], default: "student" },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

//
// 🚀 Rutas del API
//

// Registro
app.post("/api/register", async (req, res) => {
  try {
    const { dni, email, password, name, role } = req.body;

    // Verificar usuario existente
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "El email ya está registrado" });

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario nuevo
    const newUser = new User({
      dni,
      name,
      email,
      password: hashedPassword,
      role
    });

    await newUser.save();
    res.status(201).json({ message: "Usuario registrado exitosamente" });

  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ message: "Error en el registro" });
  }
});

// Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    // Validar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

    // Crear token JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ message: "Error en el login" });
  }
});

// 🌍 Ruta base
app.get("/", (req, res) => {
  res.send("API Smart Tutor funcionando 🚀");
});

// 🔥 Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
