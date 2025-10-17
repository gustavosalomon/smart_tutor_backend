import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Settings, Users, TrendingUp, BookOpen } from 'lucide-react';
import { getCurrentUser } from '../services/api';
import SubjectsPage from './Subjects';
import WeeklyPerformanceChart from '../components/WeeklyPerformanceChart';

export default function Dashboard() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getCurrentUser(token).then(data => {
        if (data && !data.message) setUser(data);
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/*<div className="text-xl font-semibold text-green-700">Smart Tutor</div>*/}
          <img 
              src="/logodash.png" 
              alt="Smart Tutor Logo" 
              className="h-10 w-auto" 
            />
          <nav className="flex gap-6 text-sm text-gray-700">
            <a className="hover:text-green-700 cursor-pointer" onClick={() => navigate('/dashboard')}>Inicio</a>
            <a className="hover:text-green-700" href="#">Tutores</a>
            <a className="hover:text-green-700" href="#">Recursos</a>
            <a className="hover:text-green-700 cursor-pointer" onClick={() => navigate('/my-progress')}>Mi Progreso</a>
            <a className="hover:text-green-700" href="#">Configuración</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="relative" aria-label="Notificaciones">
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-red-500" />
              <span className="text-gray-600">🔔</span>
            </button>
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 focus:ring-2 focus:ring-green-500"
              >
                <img alt="avatar" src="https://i.pravatar.cc/64" />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <button 
                    onClick={() => navigate('/profile')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <User size={16} />
                    Mi Perfil
                  </button>
                  <button 
                    onClick={() => navigate('/settings')}
                    className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                  >
                    <Settings size={16} />
                    Configuración
                  </button>
                  <hr className="my-1" />
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut size={16} />
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold text-gray-900">
          ¡Bienvenido de nuevo{user && user.name ? `, ${user.name}` : user && user.email ? `, ${user.email}` : ''}!
        </h1>
        <p className="text-gray-600 mt-1">Continúa tu camino de aprendizaje personalizado</p>
        <div className="mt-8">
          <SubjectsPage />
        </div>

        {/* Sección: ¿Por qué elegir estudiar con nosotros? */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">¿Por qué elegir estudiar con nosotros?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tutores Expertos */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                <Users className="text-green-700" size={32} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Tutores Expertos</h3>
              <p className="text-sm text-gray-600">Aprende con profesionales calificados y con experiencia</p>
            </div>

            {/* Seguimiento Personalizado */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                <TrendingUp className="text-green-700" size={32} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Seguimiento Personalizado</h3>
              <p className="text-sm text-gray-600">Monitorea tu progreso y adapta tu plan de estudios</p>
            </div>

            {/* Recursos Ilimitados */}
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-4">
                <BookOpen className="text-green-700" size={32} />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Recursos Ilimitados</h3>
              <p className="text-sm text-gray-600">Accede a videos, ejercicios y material de estudio</p>
            </div>
          </div>
        </div>

        {/* Gráfico de Rendimiento Semanal */}
        <div className="mt-8">
          <WeeklyPerformanceChart />
        </div>
      </main>
    </div>
  );
}
