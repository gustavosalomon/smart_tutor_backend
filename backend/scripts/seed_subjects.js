// Script para poblar la colección 'subjects' en MongoDB con las materias Física y Matemática

const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String,
  icono: String,
  nivel: String,
  temas: [String],
  estudiantes: Number
});

const Subject = mongoose.model('Subject', SubjectSchema);

async function seed() {
  await mongoose.connect('mongodb://localhost:5000/smart_tutor'); // Cambia el string de conexión si es necesario

  await Subject.deleteMany({}); // Limpia la colección antes de insertar

  await Subject.insertMany([
    {
      nombre: 'Matemática',
      descripcion: 'Aprende los fundamentos de la matemática.',
      icono: 'Calculator',
      nivel: 'Básico',
      temas: ['Álgebra', 'Geometría', 'Cálculo'],
      estudiantes: 120
    },
    {
      nombre: 'Física',
      descripcion: 'Explora los principios de la física.',
      icono: 'Atom',
      nivel: 'Avanzado',
      temas: ['Mecánica', 'Óptica', 'Termodinámica'],
      estudiantes: 80
    }
  ]);

  console.log('Materias insertadas correctamente');
  mongoose.disconnect();
}

seed();