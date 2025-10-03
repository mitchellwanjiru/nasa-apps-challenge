import { CheckCircle2, AlertTriangle, XCircle, AlertCircle } from 'lucide-react';

interface ReadinessCardProps {
  score: number;
  recommendation: string;
}

export default function ReadinessCard({ score, recommendation }: ReadinessCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 70) return 'from-green-500 to-green-600';
    if (score >= 50) return 'from-yellow-400 to-yellow-500';
    if (score >= 30) return 'from-orange-400 to-orange-500';
    return 'from-red-500 to-red-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 70) return <CheckCircle2 className="w-8 h-8 text-green-600" />;
    if (score >= 50) return <AlertCircle className="w-8 h-8 text-yellow-600" />;
    if (score >= 30) return <AlertTriangle className="w-8 h-8 text-orange-600" />;
    return <XCircle className="w-8 h-8 text-red-600" />;
  };

  const getScoreLabel = (score: number) => {
    if (score >= 70) return 'Excellent';
    if (score >= 50) return 'Good';
    if (score >= 30) return 'Marginal';
    return 'Poor';
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className={`bg-gradient-to-r ${getScoreColor(score)} text-white p-6`}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Planting Readiness</h2>
          {getScoreIcon(score)}
        </div>

        <div className="flex items-end gap-2">
          <div className="text-5xl font-bold">{score}</div>
          <div className="text-2xl font-light mb-1">/100</div>
        </div>

        <div className="mt-2 text-sm font-medium opacity-90">
          {getScoreLabel(score)} Conditions
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
            <h3 className="text-sm font-semibold text-gray-700">Recommendation</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{recommendation}</p>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100">
          <div className="bg-blue-50 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-blue-800">
                Data updates every 24 hours. Check back daily for the latest conditions and recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
