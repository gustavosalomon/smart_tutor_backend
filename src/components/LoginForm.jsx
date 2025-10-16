import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff } from 'lucide-react';

export default function LoginForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    dni: ''
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (isLogin) {
      if (!formData.email) newErrors.email = 'Email es requerido';
      if (!formData.password) newErrors.password = 'Contraseña es requerida';
    } else {
      if (!formData.dni) newErrors.dni = 'DNI es requerido';
      if (!formData.email) newErrors.email = 'Email es requerido';
      if (!formData.password) newErrors.password = 'Contraseña es requerida';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Here you would typically make an API call
      console.log('Form submitted:', formData);
      // Reset form after submission
      setFormData({ email: '', password: '', dni: '' });
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center p-4">
      <div className="form_container w-full max-w-md bg-white rounded-xl shadow-[0px_106px_42px_rgba(0,0,0,0.01),0px_59px_36px_rgba(0,0,0,0.05),0px_26px_26px_rgba(0,0,0,0.09),0px_7px_15px_rgba(0,0,0,0.1)] p-10">
        {/* Logo Banner */}
        <div className="mb-6 flex justify-center">
          <img 
            src="https://raw.githubusercontent.com/flancitoo01arg/fonts/e32a7f1cbefe0d578a44393bce23c267bf872f4f/ddws.png" 
            alt="Instituto Politécnico Formosa Logo" 
            className="w-full max-w-xs h-auto"
          />
        </div>

        <div className="title_container text-center mb-6">
          <h1 className="title text-2xl font-bold text-[#2e7d32] mb-2">
            {isLogin ? 'Ingreso de Alumnos/Tutores' : 'Registro de Nuevo Usuario'}
          </h1>
          <p className="subtitle text-sm text-gray-600 max-w-xs mx-auto">
            {isLogin 
              ? 'Ingrese sus credenciales para acceder a su cuenta' 
              : 'Complete sus datos para crear una nueva cuenta'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div className="input_container">
              <label className="input_label text-xs font-semibold text-gray-600 mb-1 block">
                DNI
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  name="dni"
                  value={formData.dni}
                  onChange={handleInputChange}
                  placeholder="Ingrese su DNI"
                  className={`input_field w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition-all ${
                    errors.dni ? 'border-red-500' : 'border-gray-300'
                  } focus:border-[#2e7d32] focus:ring-2 focus:ring-[#c8e6c9]`}
                />
              </div>
              {errors.dni && <p className="text-red-500 text-xs mt-1">{errors.dni}</p>}
            </div>
          )}

          <div className="input_container">
            <label className="input_label text-xs font-semibold text-gray-600 mb-1 block">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="nombre@correo.com"
                className={`input_field w-full pl-10 pr-4 py-3 border rounded-lg outline-none transition-all ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } focus:border-[#2e7d32] focus:ring-2 focus:ring-[#c8e6c9]`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="input_container">
            <label className="input_label text-xs font-semibold text-gray-600 mb-1 block">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
                className={`input_field w-full pl-10 pr-10 py-3 border rounded-lg outline-none transition-all ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } focus:border-[#2e7d32] focus:ring-2 focus:ring-[#c8e6c9]`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="sign-in_btn w-full py-3 bg-[#2e7d32] hover:bg-[#2e7d32]/90 text-white font-semibold rounded-lg transition-colors duration-200"
          >
            {isLogin ? 'Ingresar' : 'Registrarse'}
          </button>
        </form>

        <p className="note text-center mt-6">
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#2e7d32] hover:underline text-sm font-medium"
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