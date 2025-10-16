import React, { useEffect, useState } from 'react';
import { Loader, Calculator, Atom } from 'lucide-react';

const ICONS = {
  Calculator: <Calculator size={56} className="text-green-700" />, // Matemática
  Atom: <Atom size={56} className="text-green-700" />, // Física
};

export default function SubjectsPage() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/subjects')
      .then(res => res.json())
      .then(data => {
        setSubjects(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <Loader className="animate-spin" size={32} />
      <span className="ml-2">Cargando materias...</span>
    </div>
  );

  return (
    <div className="">
      <h2 className="text-lg font-semibold mb-1">Elige tu Materia</h2>
      <p className="mb-6 text-gray-600">Selecciona la materia que deseas estudiar y comienza tu camino de aprendizaje</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjects.map((subject) => (
          <div key={subject._id} className="rounded-2xl shadow-md border bg-white overflow-hidden flex flex-col">
            <div className="relative flex flex-col items-center justify-center py-8" style={{ background: subject.nivel === 'Avanzado' ? '#b2dfdb' : '#dcedc8' }}>
              {ICONS[subject.icono] || (
                subject.icono && subject.icono.startsWith('http') ? (
                  <img src={subject.icono} alt={subject.nombre} className="w-14 h-14 object-contain" />
                ) : (
                  <span className="w-14 h-14 bg-gray-200 rounded-full flex items-center justify-center text-2xl">?</span>
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
                    <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-xs border border-gray-200">{tema}</span>
                  ))}
                </div>
              </div>
              <hr className="my-2" />
              <div className="flex items-center text-sm text-gray-500 mt-2">
                <span className="mr-2">👥</span>
                {subject.estudiantes} estudiantes
              </div>
              <button className="w-full mt-4 py-2 bg-green-700 hover:bg-green-800 text-white font-semibold rounded-lg transition-colors duration-200">
                Comenzar a estudiar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
