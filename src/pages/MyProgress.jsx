import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Settings, ArrowLeft } from 'lucide-react';
import WeeklyPerformanceChart from '../components/WeeklyPerformanceChart';

export default function MyProgress() {
  const [showUserMenu, setShowUserMenu] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="text-xl font-semibold text-green-700">Smart Tutor</div>
          <nav className="flex gap-6 text-sm text-gray-700">
            <a className="hover:text-green-700 cursor-pointer" onClick={() => navigate('/dashboard')}>Inicio</a>
            <a className="hover:text-green-700" href="#">Tutores</a>
            <a className="hover:text-green-700" href="#">Recursos</a>
            <a className="text-green-700 font-semibold cursor-pointer" onClick={() => navigate('/my-progress')}>Mi Progreso</a>
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
                    onClick={() => navigate('/settings')}
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
        {/* Botón de regreso */}
        <button 
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft size={20} />
          <span>Volver al inicio</span>
        </button>

        <h1 className="text-2xl font-semibold text-gray-900">Mi Progreso</h1>
        <p className="text-gray-600 mt-1">Monitorea tu evolución y rendimiento académico</p>

        {/* Seguimiento Semanal */}
        <div className="mt-8">
          <WeeklyPerformanceChart />
        </div>

        {/* Estadísticas adicionales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Promedio General</h3>
            <p className="text-3xl font-bold text-green-700">91%</p>
            <p className="text-xs text-gray-500 mt-1">+5% desde la última semana</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Horas de Estudio</h3>
            <p className="text-3xl font-bold text-green-700">24h</p>
            <p className="text-xs text-gray-500 mt-1">Esta semana</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-1">Racha de Estudio</h3>
            <p className="text-3xl font-bold text-green-700">12 días</p>
            <p className="text-xs text-gray-500 mt-1">¡Sigue así! 🔥</p>
          </div>
        </div>

        {/* Progreso por materia */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Progreso por Materia</h2>
          
          {/* Matemáticas */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Matemáticas</span>
              <span className="text-sm font-semibold text-green-700">94%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-600 h-2 rounded-full" style={{ width: '94%' }}></div>
            </div>
          </div>

          {/* Ciencias */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Ciencias</span>
              <span className="text-sm font-semibold text-green-700">95%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
            </div>
          </div>

          {/* Idiomas */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">Idiomas</span>
              <span className="text-sm font-semibold text-green-700">93%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: '93%' }}></div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
