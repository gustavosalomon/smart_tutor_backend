import mongoose from "mongoose";

// ----------------------
// 1️⃣ Sub-esquema para el progreso de cada materia
// ----------------------
const progressSchema = new mongoose.Schema({
  subjectId: { type: mongoose.Schema.Types.ObjectId, ref: "Subject" }, // referencia a la materia
  completedLessons: { type: Number, default: 0 }, // lecciones completadas
  totalLessons: { type: Number, default: 0 },     // total de lecciones de la materia
  lastAccess: { type: Date, default: Date.now },  // última vez que accedió
  score: { type: Number, default: 0 }            // puntaje o progreso en %
});

// ----------------------
// 2️⃣ Esquema principal de usuario
// ----------------------
const userSchema = new mongoose.Schema({
  dni: String,
  name: String,
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["student", "tutor", "admin"], default: "student" },
  subjects: [progressSchema], // 👈 Aquí se guarda el progreso de cada materia elegida
  createdAt: { type: Date, default: Date.now }
});

// ----------------------
// 3️⃣ Exportar el modelo
// ----------------------
export default mongoose.model("User", userSchema);

