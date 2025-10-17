import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, User, Settings, Users, TrendingUp, BookOpen } from 'lucide-react';
import { getCurrentUser } from '../services/api';
import SubjectsPage from './Subjects';
import WeeklyPerformanceChart from '../components/WeeklyPerformanceChart';

export default function Dashboard() {
  // Referencias para scroll
  const profesoresRef = React.useRef(null);
  const progresoRef = React.useRef(null);

  const handleScrollToProfesores = () => {
    profesoresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const handleScrollToProgreso = () => {
    progresoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
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
            <a className="hover:text-green-700 cursor-pointer" onClick={handleScrollToProfesores}>Tutores</a>
            <a className="hover:text-green-700" href="#">Recursos</a>
            <a className="hover:text-green-700 cursor-pointer" onClick={handleScrollToProgreso}>Mi Progreso</a>
            <a className="hover:text-green-700 cursor-pointer" onClick={() => navigate('/settings')}>Configuración</a>
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
                <img alt="avatar" src="/buho_usuario.png" />
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
        <h1 className="text-2xl font-semibold text-gray-900">
          ¡Bienvenido de nuevo{user && user.name ? `, ${user.name}` : user && user.email ? `, ${user.email}` : ''}!
        </h1>
        <p className="text-gray-600 mt-1">Continúa tu camino de aprendizaje personalizado</p>
        <div className="mt-8">
          <SubjectsPage />
        </div>


        {/* Sección: Beneficios */}
        <div className="mt-10">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex flex-col md:flex-row justify-between items-stretch gap-8">
              {/* Profesores */}
              <div className="flex-1 flex flex-col items-center text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-3">
                  <Users className="text-green-700" size={32} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Profesores</h3>
                <p className="text-sm text-gray-600">Aprende con profesionales calificados y con experiencia</p>
              </div>
              {/* Seguimiento Personalizado */}
              <div className="flex-1 flex flex-col items-center text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-3">
                  <TrendingUp className="text-green-700" size={32} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Seguimiento Personalizado</h3>
                <p className="text-sm text-gray-600">Monitorea tu progreso y adapta tu plan de estudios</p>
              </div>
              {/* Recursos Ilimitados */}
              <div className="flex-1 flex flex-col items-center text-center">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-green-100 rounded-2xl flex items-center justify-center mb-3">
                  <BookOpen className="text-green-700" size={32} />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">Recursos ilimitados</h3>
                <p className="text-sm text-gray-600">Accede a vídeos, ejercicios y material de estudio</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sección: Nuestros Tutores Destacados */}
  <div className="mt-12" ref={profesoresRef}>
          <h2 className="text-lg font-semibold mb-1">Nuestros Profes..!!</h2>
          <p className="mb-6 text-gray-600">Contacta directamente a nuestros mejores profesionales</p>
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profe 1 */}
            <div className="flex-1 bg-white rounded-xl border-2 border-green-500 p-6 flex flex-col items-center shadow-sm">
              <img src="/buho_usuario.png" alt="Prof. Cáceres Lara" className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white shadow-lg" />
              <h3 className="font-semibold text-gray-900 text-lg">Prof. Cáceres Lara</h3>
              <p className="text-sm text-gray-600 mb-2">Física</p>
              <div className="w-full flex flex-col gap-2 mb-3">
                <div className="flex items-center justify-center bg-gray-50 rounded px-3 py-2 text-gray-700"><span className="mr-2">✉️</span>cacereslara@ipf.com</div>
                <div className="flex items-center justify-center bg-gray-50 rounded px-3 py-2 text-gray-700"><span className="mr-2">📞</span> +54 9 11 2345-6789</div>
              </div>
              <div className="flex gap-2 w-full mt-auto">
                <a href="mailto:ana.garcia@edumentor.com" className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-100 transition"><span>📧</span>Email</a>
                <a href="https://wa.me/5491123456789" target="_blank" rel="noopener noreferrer" className="flex-1 py-2 rounded-lg border border-green-600 text-white bg-green-600 flex items-center justify-center gap-2 hover:bg-green-700 transition"><span>🟢</span>WhatsApp</a>
              </div>
            </div>
            {/* Profe 2 */}
            <div className="flex-1 bg-white rounded-xl border p-6 flex flex-col items-center shadow-sm">
              <img src="/buho_usuario.png" alt="Dellagnolo Johanna" className="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white shadow-lg" />
              <h3 className="font-semibold text-gray-900 text-lg">Profe. Dellagnolo Johanna</h3>
              <p className="text-sm text-gray-600 mb-2">Matemáticas</p>
              <div className="w-full flex flex-col gap-2 mb-3">
                <div className="flex items-center justify-center bg-gray-50 rounded px-3 py-2 text-gray-700"><span className="mr-2">✉️</span>dellagnolojohanna@ipf.com</div>
                <div className="flex items-center justify-center bg-gray-50 rounded px-3 py-2 text-gray-700"><span className="mr-2">📞</span> +54 9 11 3456-7890</div>
              </div>
              <div className="flex gap-2 w-full mt-auto">
                <a href="mailto:carlos.mendez@edumentor.com" className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-700 flex items-center justify-center gap-2 hover:bg-gray-100 transition"><span>📧</span>Email</a>
                <a href="https://wa.me/5491134567890" target="_blank" rel="noopener noreferrer" className="flex-1 py-2 rounded-lg border border-green-600 text-white bg-green-600 flex items-center justify-center gap-2 hover:bg-green-700 transition"><span>🟢</span>WhatsApp</a>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico de Rendimiento Semanal */}
        <div className="mt-8" ref={progresoRef}>
          <WeeklyPerformanceChart />
        </div>
      </main>
    </div>
  );
}
