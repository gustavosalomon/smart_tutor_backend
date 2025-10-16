import React from 'react';
import { TrendingUp } from 'lucide-react';

export default function WeeklyPerformanceChart() {
  // Datos de rendimiento semanal
  const data = [
    { week: 'Sem 1', ciencias: 72, idiomas: 68, matematicas: 70 },
    { week: 'Sem 2', ciencias: 75, idiomas: 72, matematicas: 73 },
    { week: 'Sem 3', ciencias: 82, idiomas: 78, matematicas: 80 },
    { week: 'Sem 4', ciencias: 88, idiomas: 85, matematicas: 87 },
    { week: 'Sem 5', ciencias: 92, idiomas: 90, matematicas: 91 },
    { week: 'Sem 6', ciencias: 95, idiomas: 93, matematicas: 94 }
  ];

  // Encontrar el valor máximo para escalar el gráfico
  const maxValue = 100;
  const minValue = 0;

  // Calcular la altura de cada punto en el SVG (invertido porque SVG crece hacia abajo)
  const getY = (value) => {
    const chartHeight = 200;
    const padding = 20;
    return chartHeight - padding - ((value - minValue) / (maxValue - minValue)) * (chartHeight - 2 * padding);
  };

  // Calcular posición X para cada semana
  const getX = (index) => {
    const chartWidth = 600;
    const padding = 40;
    return padding + (index * (chartWidth - 2 * padding) / (data.length - 1));
  };

  // Generar puntos de la línea
  const generatePath = (dataKey) => {
    return data.map((item, index) => {
      const x = getX(index);
      const y = getY(item[dataKey]);
      return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(' ');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
      <div className="flex items-center gap-2 mb-6">
        <TrendingUp className="text-gray-700" size={20} />
        <h2 className="text-xl font-semibold text-gray-900">Rendimiento Semanal</h2>
      </div>
      
      <div className="relative">
        <svg viewBox="0 0 600 240" className="w-full h-64">
          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((value) => (
            <g key={value}>
              <line
                x1="40"
                y1={getY(value)}
                x2="560"
                y2={getY(value)}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="3,3"
              />
              <text x="10" y={getY(value) + 5} fontSize="12" fill="#9ca3af">
                {value}
              </text>
            </g>
          ))}

          {/* Línea de Ciencias (verde) */}
          <path
            d={generatePath('ciencias')}
            fill="none"
            stroke="#4ade80"
            strokeWidth="2"
          />
          {data.map((item, index) => (
            <circle
              key={`ciencias-${index}`}
              cx={getX(index)}
              cy={getY(item.ciencias)}
              r="4"
              fill="#4ade80"
              stroke="white"
              strokeWidth="2"
            />
          ))}

          {/* Línea de Idiomas (amarillo/verde claro) */}
          <path
            d={generatePath('idiomas')}
            fill="none"
            stroke="#a3e635"
            strokeWidth="2"
          />
          {data.map((item, index) => (
            <circle
              key={`idiomas-${index}`}
              cx={getX(index)}
              cy={getY(item.idiomas)}
              r="4"
              fill="#a3e635"
              stroke="white"
              strokeWidth="2"
            />
          ))}

          {/* Línea de Matemáticas (verde oscuro) */}
          <path
            d={generatePath('matematicas')}
            fill="none"
            stroke="#16a34a"
            strokeWidth="2"
          />
          {data.map((item, index) => (
            <circle
              key={`matematicas-${index}`}
              cx={getX(index)}
              cy={getY(item.matematicas)}
              r="4"
              fill="#16a34a"
              stroke="white"
              strokeWidth="2"
            />
          ))}

          {/* Etiquetas del eje X */}
          {data.map((item, index) => (
            <text
              key={`label-${index}`}
              x={getX(index)}
              y="230"
              fontSize="12"
              fill="#6b7280"
              textAnchor="middle"
            >
              {item.week}
            </text>
          ))}
        </svg>

        {/* Leyenda */}
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#4ade80]"></div>
            <span className="text-sm text-gray-600">Ciencias</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#a3e635]"></div>
            <span className="text-sm text-gray-600">Idiomas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#16a34a]"></div>
            <span className="text-sm text-gray-600">Matemáticas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
