import { useEffect, useRef, useState } from 'react';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import { Maximize2, Info } from 'lucide-react';

interface MapViewComponentProps {
  onAreaSelect: (coordinates: number[][]) => void;
  readinessData: number;
}

export default function MapViewComponent({ onAreaSelect, readinessData }: MapViewComponentProps) {
  const mapDiv = useRef<HTMLDivElement>(null);
  const [view, setView] = useState<MapView | null>(null);

  useEffect(() => {
    if (mapDiv.current) {
      const map = new Map({
        basemap: 'satellite',
      });

      const mapView = new MapView({
        container: mapDiv.current,
        map: map,
        center: [28.0, -1.9],
        zoom: 8,
        constraints: {
          minZoom: 6,
          maxZoom: 14,
        },
      });

      const graphicsLayer = new GraphicsLayer();
      map.add(graphicsLayer);

      mapView.when(() => {
        createReadinessOverlay(graphicsLayer, readinessData);
      });

      mapView.on('click', (event) => {
        const coords = [event.mapPoint.longitude, event.mapPoint.latitude];
        onAreaSelect([coords]);
        graphicsLayer.removeAll();
        createReadinessOverlay(graphicsLayer, readinessData);
      });

      setView(mapView);

      return () => {
        if (mapView) {
          mapView.destroy();
        }
      };
    }
  }, []);

  useEffect(() => {
    if (view) {
      const graphicsLayer = view.map.layers.find(
        (layer) => layer.type === 'graphics'
      ) as GraphicsLayer;
      if (graphicsLayer) {
        graphicsLayer.removeAll();
        createReadinessOverlay(graphicsLayer, readinessData);
      }
    }
  }, [readinessData, view]);

  const createReadinessOverlay = (layer: GraphicsLayer, score: number) => {
    const centerLat = -1.9 + (Math.random() - 0.5) * 0.5;
    const centerLon = 28.0 + (Math.random() - 0.5) * 0.5;

    for (let i = 0; i < 8; i++) {
      const offsetLat = (Math.random() - 0.5) * 0.3;
      const offsetLon = (Math.random() - 0.5) * 0.3;
      const localScore = score + (Math.random() - 0.5) * 30;
      const color = getColorForScore(Math.max(0, Math.min(100, localScore)));

      const polygon = {
        type: 'polygon',
        rings: [
          [
            [centerLon + offsetLon, centerLat + offsetLat],
            [centerLon + offsetLon + 0.05, centerLat + offsetLat],
            [centerLon + offsetLon + 0.05, centerLat + offsetLat + 0.05],
            [centerLon + offsetLon, centerLat + offsetLat + 0.05],
            [centerLon + offsetLon, centerLat + offsetLat],
          ],
        ],
      };

      const fillSymbol = {
        type: 'simple-fill',
        color: color,
        outline: {
          color: [255, 255, 255, 0.3],
          width: 1,
        },
      };

      const polygonGraphic = new Graphic({
        geometry: polygon,
        symbol: fillSymbol,
      });

      layer.add(polygonGraphic);
    }
  };

  const getColorForScore = (score: number): number[] => {
    if (score >= 70) {
      return [34, 197, 94, 0.6];
    } else if (score >= 50) {
      return [251, 191, 36, 0.6];
    } else if (score >= 30) {
      return [251, 146, 60, 0.6];
    } else {
      return [239, 68, 68, 0.6];
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Maximize2 className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Farm Area Analysis</h2>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Info className="w-4 h-4" />
            <span>Click map to select area</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div ref={mapDiv} className="w-full h-[400px]" />

        <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-md p-3">
          <div className="text-xs font-semibold text-gray-700 mb-2">Readiness Legend</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-3 bg-green-500 rounded"></div>
              <span className="text-xs text-gray-600">Ready (70-100)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-3 bg-yellow-400 rounded"></div>
              <span className="text-xs text-gray-600">Moderate (50-69)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-3 bg-orange-400 rounded"></div>
              <span className="text-xs text-gray-600">Marginal (30-49)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-3 bg-red-500 rounded"></div>
              <span className="text-xs text-gray-600">Not Ready (0-29)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
