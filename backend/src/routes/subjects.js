import express from "express";
import User from "../models/User.js";
import Subject from "../models/Subject.js";

const router = express.Router();

// POST /api/subjects/choose
// El estudiante elige una materia
router.post("/choose", async (req, res) => {
  try {
    const { userId, subjectId } = req.body;

    // Buscar la materia
    const subject = await Subject.findById(subjectId);
    if (!subject) return res.status(404).json({ message: "Materia no encontrada" });

    const totalLessons = subject.lessons.length;

    // Agregar la materia al usuario solo si no la tiene ya
    const user = await User.findById(userId);
    const alreadyAdded = user.subjects.some(s => s.subjectId.toString() === subjectId);
    if (alreadyAdded) return res.status(400).json({ message: "Materia ya elegida" });

    user.subjects.push({ subjectId, totalLessons });
    await user.save();

    res.json({ message: "Materia agregada correctamente", subjects: user.subjects });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error al elegir materia" });
  }
});

export default router;
