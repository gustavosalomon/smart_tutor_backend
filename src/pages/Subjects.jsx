import React, { useEffect, useState } from 'react';
import { Loader, Calculator, Atom } from 'lucide-react';
import { motion } from 'framer-motion';

const ICONS = {
  Calculator: <Calculator size={56} className="text-green-700" />, // Matemática
  Atom: <Atom size={56} className="text-green-700" />, // Física
};

// Mock function to simulate API call to your backend for progress
const fetchUserProgress = async (subjectId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockProgress = {
        currentUnit: 1,
        completedUnits: []
      };
      resolve(mockProgress);
    }, 300);
  });
};

const SubjectProgressCard = ({ subject }) => {
  const [units, setUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('progress'); // 'progress', 'welcome', or { type: 'unit', id: number }

  const getSubjectData = (subjectName) => {
    if (subjectName === 'Física') {
      return {
        unitTitles: [
          'Unidad 1: Movimiento en una dimensión',
          'Unidad 2: Movimiento en dos dimensiones',
          'Unidad 3: Fuerzas y leyes del movimiento de Newton',
          'Unidad 4: Fuerza centrípeta y gravitación',
          'Unidad 5: Trabajo y energía',
        ],
        lessons: [
          [
            'Introducción a la física: Movimiento en una dimensión',
            'Desplazamiento, velocidad y tiempo: Movimiento en una dimensión',
            'Aceleración: Movimiento en una dimensión',
            'Las fórmulas cinemáticas y el movimiento de un proyectil: Movimiento en una dimensión',
            'Videos antiguos acerca del movimiento de un proyectil: Movimiento en una dimensión',
          ],
          [
            'El movimiento de un proyectil en dos dimensiones: Movimiento en dos dimensiones',
            'El ángulo óptimo para un proyectil: Movimiento en dos dimensiones',
          ],
          [
            'Las leyes del movimiento de Newton: Fuerzas y leyes del movimiento de Newton',
            'La fuerza normal y la fuerza de contacto: Fuerzas y leyes del movimiento de Newton',
            'Fuerzas balanceadas y desbalanceadas: Fuerzas y leyes del movimiento de Newton',
            'El calcetín lento en el planeta Lubricón VI: Fuerzas y leyes del movimiento de Newton',
            'La fricción y los planos inclinados: Fuerzas y leyes del movimiento de Newton',
            'Tensión: Fuerzas y leyes del movimiento de Newton',
            'Manejar sistemas: Fuerzas y leyes del movimiento de Newton',
          ],
          [
            'Movimiento circular y aceleración centrípeta: Fuerza centrípeta y gravitación',
            'Fuerzas centrípetas: Fuerza centrípeta y gravitación',
            'La ley de la gravitación de Newton: Fuerza centrípeta y gravitación',
          ],
          [
            'Trabajo y energía: Trabajo y energía',
            'Resortes y la ley de Hooke: Trabajo y energía',
            'Ventaja mecánica: Trabajo y energía',
          ],
        ],
      };
    } else if (subjectName === 'Matemáticas') {
      return {
        unitTitles: [
          'Unidad 1: Álgebra básica',
          'Unidad 2: Ecuaciones y funciones',
          'Unidad 3: Geometría analítica',
          'Unidad 4: Trigonometría',
          'Unidad 5: Cálculo diferencial',
        ],
        lessons: [
          ['Lección 1.1: Introducción al álgebra', 'Lección 1.2: Operaciones básicas'],
          ['Lección 2.1: Ecuaciones lineales', 'Lección 2.2: Funciones cuadráticas'],
          ['Lección 3.1: Distancia entre puntos', 'Lección 3.2: Ecuación de la recta'],
          ['Lección 4.1: Razones trigonométricas', 'Lección 4.2: Ley de senos y cosenos'],
          ['Lección 5.1: Límites', 'Lección 5.2: Derivadas básicas'],
        ],
      };
    } else {
      const titles = ['Unidad 1', 'Unidad 2', 'Unidad 3', 'Unidad 4', 'Unidad 5'];
      const lessons = titles.map(() => ['Lección introductoria']);
      return { unitTitles: titles, lessons };
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const { unitTitles, lessons } = getSubjectData(subject.nombre);

      try {
        const progress = await fetchUserProgress(subject._id);
        const mappedUnits = unitTitles.map((title, index) => ({
          id: index + 1,
          title,
          lessons: lessons[index] || [],
          completed: progress.completedUnits.includes(index + 1),
          current: progress.currentUnit === index + 1,
        }));
        setUnits(mappedUnits);
      } catch (error) {
        console.error('Error fetching progress:', error);
        const fallbackUnits = unitTitles.map((title, index) => ({
          id: index + 1,
          title,
          lessons: lessons[index] || [],
          completed: false,
          current: index === 0,
        }));
        setUnits(fallbackUnits);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [subject]);

  const handleContinue = (unitId) => {
    setViewMode({ type: 'unit', id: unitId });
  };

  const handleViewAll = () => {
    setViewMode('welcome');
  };

  const handleBackToProgress = () => {
    setViewMode('progress');
  };

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Modo Bienvenida (Ver todos)
  if (viewMode === 'welcome') {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <button
          onClick={handleBackToProgress}
          className="mb-4 text-[#4caf50] hover:text-[#2e7d32] flex items-center gap-1"
        >
          ← Volver al progreso
        </button>
        <h2 className="text-2xl font-bold text-[#2e7d32] mb-4">
          ¡Bienvenido a las Lecciones de {subject.nombre.toLowerCase()}!
        </h2>
        <p className="mb-6 text-gray-700">
          {subject.nombre === 'Física'
            ? 'La física es el estudio de la materia, el movimiento, la energía y la fuerza. Aquí puedes explorar videos, artículos y ejercicios por tema.'
            : `Explora los conceptos fundamentales de ${subject.nombre.toLowerCase()}.`}
        </p>

        <div className="space-y-4">
          {units.map((unit) => (
            <div key={unit.id} className="p-4 border rounded-lg border-gray-200">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 bg-[#2e7d32] rounded-full flex items-center justify-center mr-3">
                  <span className="text-white text-sm font-bold">{unit.id}</span>
                </div>
                <h3 className="text-lg font-semibold text-[#2e7d32]">{unit.title}</h3>
              </div>
              <div className="space-y-1 text-sm text-gray-700">
                {unit.lessons.map((lesson, idx) => (
                  <div key={idx}>{lesson}</div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Modo Unidad específica
  if (viewMode.type === 'unit') {
    const unit = units.find((u) => u.id === viewMode.id);
    if (!unit) return <div className="p-6">Unidad no encontrada</div>;

    return (
      <div className="bg-white rounded-lg shadow p-6">
        <button
          onClick={handleBackToProgress}
          className="mb-4 text-[#4caf50] hover:text-[#2e7d32] flex items-center gap-1"
        >
          ← Volver al progreso
        </button>
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 bg-[#2e7d32] rounded-full flex items-center justify-center mr-3">
            <span className="text-white font-bold">{unit.id}</span>
          </div>
          <h2 className="text-xl font-bold text-[#2e7d32]">{unit.title}</h2>
        </div>
        <div className="space-y-2">
          {unit.lessons.map((lesson, idx) => (
            <div key={idx} className="p-3 bg-gray-50 rounded text-gray-700">
              {lesson}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Modo Progreso (por defecto)
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-[#333333]">
          Lecciones de {subject.nombre.toLowerCase()}
        </h2>
        <button
          onClick={handleViewAll}
          className="text-[#4caf50] hover:text-[#2e7d32] font-medium"
        >
          Ver todos ({units.length})
        </button>
      </div>

      <div className="space-y-4">
        {units.map((unit, index) => (
          <motion.div
            key={unit.id}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center justify-between py-3 border-b border-[#c8e6c9] last:border-b-0"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  unit.completed
                    ? 'bg-[#2e7d32]'
                    : unit.current
                    ? 'bg-[#4caf50]'
                    : 'bg-[#c8e6c9]'
                }`}
              >
                {unit.completed ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="white"
                    viewBox="0 0 16 16"
                  >
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
                  </svg>
                ) : (
                  <span className="text-[#333333] font-medium">{unit.id}</span>
                )}
              </div>
              <span
                className={`font-medium ${
                  unit.completed || unit.current ? 'text-[#333333]' : 'text-gray-400'
                }`}
              >
                {unit.title}
              </span>
            </div>

            {unit.current && (
              <button
                onClick={() => handleContinue(unit.id)}
                className="bg-[#2e7d32] hover:bg-[#1b5e20] text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 whitespace-nowrap"
              >
                Continuar
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- MOCK DE DATOS PARA PREVISUALIZACIÓN ---
const fetchSubjects = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockSubjects = [
        {
          _id: '60a7d5b1b4f4e7c3e3a4b6c1',
          nombre: 'Matemáticas',
          descripcion: 'Aprende los fundamentos de la matemática.',
          icono: 'Calculator',
          nivel: 'Básico',
          temas: ['Álgebra', 'Geometría', 'Cálculo'],
          estudiantes: 120,
        },
        {
          _id: '60a7d5b1b4f4e7c3e3a4b6c2',
          nombre: 'Física',
          descripcion: 'Explora los principios de la física.',
          icono: 'Atom',
          nivel: 'Avanzado',
          temas: ['Mecánica', 'Óptica', 'Termodinámica'],
          estudiantes: 80,
        },
      ];
      resolve(mockSubjects);
    }, 500);
  });
};

// --- PÁGINA PRINCIPAL ---
export default function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubject, setSelectedSubject] = useState(null);

  useEffect(() => {
    fetchSubjects()
      .then((data) => {
        setSubjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching mock subjects:', error);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin" size={32} />
        <span className="ml-2">Cargando materias...</span>
      </div>
    );

  if (selectedSubject) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] p-6">
        <div className="max-w-3xl mx-auto">
          <button
            onClick={() => setSelectedSubject(null)}
            className="mb-6 text-[#4caf50] hover:text-[#2e7d32] font-medium flex items-center gap-2"
          >
            ← Volver a materias
          </button>
          <h1 className="text-3xl font-bold text-[#333333] mb-6">{selectedSubject.nombre}</h1>
          <SubjectProgressCard subject={selectedSubject} />
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <h2 className="text-lg font-semibold mb-1">Elige tu Materia</h2>
      <p className="mb-6 text-gray-600">
        Selecciona la materia que deseas estudiar y comienza tu camino de aprendizaje
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((subject) => (
          <div
            key={subject._id}
            className="rounded-2xl shadow-md border bg-white overflow-hidden flex flex-col"
          >
            <div
              className="relative flex flex-col items-center justify-center py-8"
              style={{
                background: subject.nivel === 'Avanzado' ? '#b2dfdb' : '#dcedc8',
              }}
            >
              {ICONS[subject.icono] || (
                subject.icono && subject.icono.startsWith('http') ? (
                  <img
                    src={subject.icono}
                    alt={subject.nombre}
                    className="w-14 h-14 object-contain"
                  />
                ) : (
                  <span className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-2xl">
                    ?
                  </span>
                )
              )}
              <span className="absolute top-4 right-4 bg-white text-xs px-3 py-1 rounded-full shadow text-gray-700 border">
                {subject.nivel}
              </span>
            </div>
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="text-base font-bold mb-1">{subject.nombre}</h3>
              <p className="text-gray-700 mb-2 text-sm">{subject.descripcion}</p>
              <div className="mb-2">
                <span className="text-xs text-gray-500">Temas principales:</span>
                <div className="flex flex-wrap gap-2 mt-1">
                  {subject.temas.map((tema, idx) => (
                    <span
                      key={idx}
                      className="bg-gray-100 px-2 py-1 rounded text-xs border border-gray-200"
                    >
                      {tema}
                    </span>
                  ))}
                </div>
              </div>
              <hr className="my-2" />
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <span className="mr-2">👥</span>
                {subject.estudiantes} estudiantes
              </div>
              <button
                onClick={() => setSelectedSubject(subject)}
                className="w-full mt-4 py-2 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg transition-colors duration-200"
              >
                Comenzar a estudiar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}