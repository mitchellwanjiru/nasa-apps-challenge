import { useState, useEffect } from 'react';
import { Sprout } from 'lucide-react';
import MapView from './components/MapView';
import MetricsPanel from './components/MetricsPanel';
import RainfallChart from './components/RainfallChart';
import ReadinessCard from './components/ReadinessCard';
import { generateFarmData } from './utils/dataSimulator';

function App() {
  const [farmData, setFarmData] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);

  useEffect(() => {
    const data = generateFarmData();
    setFarmData(data);
  }, []);

  const handleAreaSelect = (coordinates) => {
    setSelectedArea(coordinates);
    const newData = generateFarmData();
    setFarmData(newData);
  };

  if (!farmData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Sprout className="w-12 h-12 text-green-600 mx-auto animate-pulse" />
          <p className="mt-4 text-gray-600">Loading PlantReady...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <Sprout className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">PlantReady</h1>
              <p className="text-sm text-gray-600">Smart Planting Decision Support</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <MapView
              onAreaSelect={handleAreaSelect}
              readinessData={farmData.readinessScore}
            />

            <RainfallChart data={farmData.rainfallTrend} />
          </div>

          <div className="space-y-6">
            <ReadinessCard
              score={farmData.readinessScore}
              recommendation={farmData.recommendation}
            />

            <MetricsPanel
              soilMoisture={farmData.soilMoisture}
              rainfall={farmData.rainfall}
              vegetation={farmData.vegetationIndex}
              temperature={farmData.temperature}
            />
          </div>
        </div>
      </main>

      <footer className="mt-12 pb-6 text-center text-sm text-gray-600">
        <p>Powered by simulated Digital Earth Africa data • ArcGIS Mapping</p>
      </footer>
    </div>
  );
}

export default App;
