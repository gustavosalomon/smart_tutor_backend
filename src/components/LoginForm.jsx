import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000';

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    dni: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email es requerido';
    if (!formData.password) newErrors.password = 'Contraseña es requerida';
    if (!isLogin && !formData.dni) newErrors.dni = 'DNI es requerido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    if (!validateForm()) return;
    setLoading(true);
    const endpoint = isLogin ? '/api/login' : '/api/register';
    const payload = isLogin
      ? { email: formData.email, password: formData.password }
      : { email: formData.email, password: formData.password, dni: formData.dni };
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok) {
        setMessage("");
        if (!isLogin) {
          setIsLogin(true);
          setFormData({ email: '', password: '', dni: '' });
        } else {
          navigate('/dashboard');
        }
      } else {
        setMessage(data.message || 'Ocurrió un error.');
      }
    } catch (error) {
      setMessage('No se pudo conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(prev => !prev);
    setFormData({ email: '', password: '', dni: '' });
    setErrors({});
    setMessage("");
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-10">
        <div className="mb-6 flex justify-center">
          <img 
            src="https://raw.githubusercontent.com/flancitoo01arg/fonts/e32a7f1cbefe0d578a44393bce23c267bf872f4f/ddws.png" 
            alt="Instituto Politécnico Formosa Logo" 
            className="w-full max-w-xs h-auto"
          />
        </div>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-[#2e7d32] mb-2">
            {isLogin ? 'Ingreso de Alumnos/Tutores' : 'Registro de Nuevo Usuario'}
          </h1>
          <p className="text-sm text-gray-600 max-w-xs mx-auto">
            {isLogin 
              ? 'Ingrese sus credenciales para acceder a su cuenta' 
              : 'Complete sus datos para crear una nueva cuenta'}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="text-xs font-semibold text-gray-600 mb-1 block">DNI</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="dni"
                  value={formData.dni}
                  onChange={handleInputChange}
                  placeholder="Ingrese su DNI"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition-all ${errors.dni ? 'border-red-500' : 'border-gray-300'} focus:border-[#2e7d32] focus:ring-2 focus:ring-[#c8e6c9]`}
                  disabled={loading}
                />
              </div>
              {errors.dni && <p className="text-red-500 text-xs mt-1">{errors.dni}</p>}
            </div>
          )}
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="nombre@correo.com"
                className={`w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-[#2e7d32] focus:ring-2 focus:ring-[#c8e6c9]`}
                disabled={loading}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-600 mb-1 block">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className={`w-full pl-10 pr-10 py-3 border rounded-lg outline-none transition-all ${errors.password ? 'border-red-500' : 'border-gray-300'} focus:border-[#2e7d32] focus:ring-2 focus:ring-[#c8e6c9]`}
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                disabled={loading}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <button
            type="submit"
            className={`w-full py-3 bg-[#2e7d32] hover:bg-[#2e7d32]/90 text-white font-semibold rounded-lg transition-colors duration-200`}
            disabled={loading}
          >
            {isLogin ? 'Ingresar' : 'Registrarse'}
          </button>
          {message && (
            <div className="text-center text-sm mt-2 text-red-500">{message}</div>
          )}
        </form>
        <p className="text-center mt-6">
          <button
            type="button"
            onClick={toggleMode}
            className="text-[#2e7d32] hover:underline text-sm font-medium"
            disabled={loading}
          >
            {isLogin 
              ? '¿Es tu primera vez? Regístrate aquí' 
              : '¿Ya tienes cuenta? Inicia sesión aquí'}
          </button>
        </p>
        <p className="text-center text-xs text-gray-500 mt-4">
          Términos de uso y Condiciones
        </p>
      </div>
    </div>
  );
}
