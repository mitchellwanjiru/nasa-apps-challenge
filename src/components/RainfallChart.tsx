import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';

interface RainfallChartProps {
  data: Array<{ month: string; rainfall: number }>;
}

export default function RainfallChart({ data }: RainfallChartProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Rainfall Trend</h2>
        </div>
        <p className="text-sm text-blue-100 mt-1">6-month historical data</p>
      </div>

      <div className="p-6">
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis
              tick={{ fill: '#6b7280', fontSize: 12 }}
              tickLine={{ stroke: '#e5e7eb' }}
              label={{ value: 'Rainfall (mm)', angle: -90, position: 'insideLeft', fill: '#6b7280' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '8px 12px',
              }}
              labelStyle={{ color: '#374151', fontWeight: 600 }}
              formatter={(value: number) => [`${value}mm`, 'Rainfall']}
            />
            <Line
              type="monotone"
              dataKey="rainfall"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ fill: '#3b82f6', r: 4 }}
              activeDot={{ r: 6, fill: '#2563eb' }}
            />
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="text-xs text-blue-600 font-medium mb-1">Average</div>
            <div className="text-lg font-bold text-blue-900">
              {Math.round(data.reduce((acc, d) => acc + d.rainfall, 0) / data.length)}mm
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="text-xs text-green-600 font-medium mb-1">Peak</div>
            <div className="text-lg font-bold text-green-900">
              {Math.max(...data.map(d => d.rainfall))}mm
            </div>
          </div>
          <div className="bg-orange-50 rounded-lg p-3">
            <div className="text-xs text-orange-600 font-medium mb-1">Trend</div>
            <div className="text-lg font-bold text-orange-900">
              {data[data.length - 1].rainfall > data[0].rainfall ? '↑' : '↓'}
              {Math.abs(Math.round((data[data.length - 1].rainfall - data[0].rainfall) / data[0].rainfall * 100))}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
