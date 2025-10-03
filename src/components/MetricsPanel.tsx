import { Droplets, CloudRain, Leaf, Thermometer } from 'lucide-react';

interface MetricsPanelProps {
  soilMoisture: number;
  rainfall: number;
  vegetation: number;
  temperature: number;
}

export default function MetricsPanel({
  soilMoisture,
  rainfall,
  vegetation,
  temperature,
}: MetricsPanelProps) {
  const metrics = [
    {
      label: 'Soil Moisture',
      value: `${soilMoisture.toFixed(1)}%`,
      icon: Droplets,
      color: 'blue',
      optimal: '30-50%',
      status: soilMoisture >= 30 && soilMoisture <= 50 ? 'optimal' : 'suboptimal',
    },
    {
      label: 'Rainfall (30d)',
      value: `${rainfall.toFixed(0)}mm`,
      icon: CloudRain,
      color: 'indigo',
      optimal: '100-150mm',
      status: rainfall >= 100 && rainfall <= 150 ? 'optimal' : 'suboptimal',
    },
    {
      label: 'Vegetation Index',
      value: vegetation.toFixed(2),
      icon: Leaf,
      color: 'green',
      optimal: '0.4-0.7',
      status: vegetation >= 0.4 && vegetation <= 0.7 ? 'optimal' : 'suboptimal',
    },
    {
      label: 'Temperature',
      value: `${temperature.toFixed(1)}°C`,
      icon: Thermometer,
      color: 'orange',
      optimal: '22-28°C',
      status: temperature >= 22 && temperature <= 28 ? 'optimal' : 'suboptimal',
    },
  ];

  const getColorClasses = (color: string, status: string) => {
    const isOptimal = status === 'optimal';
    const colorMap = {
      blue: {
        bg: isOptimal ? 'bg-blue-100' : 'bg-gray-100',
        icon: isOptimal ? 'text-blue-600' : 'text-gray-500',
        badge: isOptimal ? 'bg-blue-600' : 'bg-gray-400',
      },
      indigo: {
        bg: isOptimal ? 'bg-indigo-100' : 'bg-gray-100',
        icon: isOptimal ? 'text-indigo-600' : 'text-gray-500',
        badge: isOptimal ? 'bg-indigo-600' : 'bg-gray-400',
      },
      green: {
        bg: isOptimal ? 'bg-green-100' : 'bg-gray-100',
        icon: isOptimal ? 'text-green-600' : 'text-gray-500',
        badge: isOptimal ? 'bg-green-600' : 'bg-gray-400',
      },
      orange: {
        bg: isOptimal ? 'bg-orange-100' : 'bg-gray-100',
        icon: isOptimal ? 'text-orange-600' : 'text-gray-500',
        badge: isOptimal ? 'bg-orange-600' : 'bg-gray-400',
      },
    };
    return colorMap[color as keyof typeof colorMap];
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-gray-700 to-gray-800 text-white">
        <h2 className="text-lg font-semibold">Key Metrics</h2>
        <p className="text-sm text-gray-300 mt-1">Real-time environmental data</p>
      </div>

      <div className="p-6 space-y-4">
        {metrics.map((metric, index) => {
          const colors = getColorClasses(metric.color, metric.status);
          const Icon = metric.icon;

          return (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`${colors.bg} p-2 rounded-lg`}>
                    <Icon className={`w-5 h-5 ${colors.icon}`} />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-700">{metric.label}</div>
                    <div className="text-xs text-gray-500 mt-0.5">Optimal: {metric.optimal}</div>
                  </div>
                </div>
                <div className={`${colors.badge} text-white text-xs px-2 py-1 rounded-full`}>
                  {metric.status === 'optimal' ? 'Optimal' : 'Monitor'}
                </div>
              </div>

              <div className="text-2xl font-bold text-gray-900">{metric.value}</div>

              <div className="mt-3 bg-gray-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${colors.badge} transition-all duration-500`}
                  style={{
                    width: `${metric.status === 'optimal' ? 85 : 45}%`,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
