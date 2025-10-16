import React from 'react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-semibold text-green-700">Smart Tutor</div>
          <nav className="flex gap-6 text-sm text-gray-700">
            <a className="hover:text-green-700" href="#">Inicio</a>
            <a className="hover:text-green-700" href="#">Tutores</a>
            <a className="hover:text-green-700" href="#">Recursos</a>
            <a className="hover:text-green-700" href="#">Mi Progreso</a>
            <a className="hover:text-green-700" href="#">Configuración</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="relative" aria-label="Notificaciones">
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
              <span className="text-gray-600">🔔</span>
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
              <img alt="avatar" src="https://i.pravatar.cc/64" />
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-gray-900">¡Bienvenido de nuevo, Estudiante!</h1>
        <p className="text-gray-600 mt-1">Continúa tu camino de aprendizaje personalizado</p>
      </main>
    </div>
  );
}
