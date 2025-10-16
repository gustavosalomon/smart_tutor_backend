const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  nivel: { type: String, enum: ['Básico', 'Intermedio', 'Avanzado'], required: true },
  temas: [{ type: String }],
  estudiantes: { type: Number, default: 0 },
  icono: { type: String, default: '' }
});

module.exports = mongoose.model('Subject', subjectSchema);
