import express from "express";
import User from "../models/User.js";

const router = express.Router();

// POST /api/progress/update
// Actualizar el progreso de una materia
router.post("/update", async (req, res) => {
  try {
    const { userId, subjectId, completedLessons, score } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    const subjectProgress = user.subjects.find(s => s.subjectId.toString() === subjectId);
    if (!subjectProgress) return res.status(404).json({ message: "Materia no encontrada en el usuario" });

    // Actualizar progreso
    subjectProgress.completedLessons = completedLessons;
    subjectProgress.score = score;
    subjectProgress.lastAccess = new Date();

    await user.save();

    res.json({ message: "Progreso actualizado correctamente", subjects: user.subjects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al actualizar progreso" });
  }
});

export default router;
