export interface FarmData {
  readinessScore: number;
  soilMoisture: number;
  rainfall: number;
  vegetationIndex: number;
  temperature: number;
  recommendation: string;
  rainfallTrend: Array<{ month: string; rainfall: number }>;
}

export function generateFarmData(): FarmData {
  const soilMoisture = Math.random() * 40 + 20;
  const rainfall = Math.random() * 150 + 50;
  const vegetationIndex = Math.random() * 0.5 + 0.3;
  const temperature = Math.random() * 10 + 20;

  const readinessScore = calculateReadinessScore(
    soilMoisture,
    rainfall,
    vegetationIndex,
    temperature
  );

  const recommendation = generateRecommendation(
    readinessScore,
    soilMoisture,
    rainfall,
    vegetationIndex
  );

  const rainfallTrend = generateRainfallTrend();

  return {
    readinessScore,
    soilMoisture,
    rainfall,
    vegetationIndex,
    temperature,
    recommendation,
    rainfallTrend,
  };
}

function calculateReadinessScore(
  soilMoisture: number,
  rainfall: number,
  vegetationIndex: number,
  temperature: number
): number {
  let score = 0;

  if (soilMoisture >= 30 && soilMoisture <= 50) {
    score += 35;
  } else if (soilMoisture >= 25 && soilMoisture <= 55) {
    score += 20;
  } else {
    score += 5;
  }

  if (rainfall >= 100 && rainfall <= 150) {
    score += 30;
  } else if (rainfall >= 80 && rainfall <= 170) {
    score += 20;
  } else {
    score += 5;
  }

  if (vegetationIndex >= 0.4 && vegetationIndex <= 0.7) {
    score += 20;
  } else if (vegetationIndex >= 0.3 && vegetationIndex <= 0.8) {
    score += 15;
  } else {
    score += 5;
  }

  if (temperature >= 22 && temperature <= 28) {
    score += 15;
  } else if (temperature >= 18 && temperature <= 30) {
    score += 10;
  } else {
    score += 3;
  }

  return Math.min(100, Math.round(score));
}

function generateRecommendation(
  score: number,
  soilMoisture: number,
  rainfall: number,
  vegetationIndex: number
): string {
  if (score >= 80) {
    return 'Excellent conditions for planting. All key indicators are optimal. Proceed with planting operations.';
  } else if (score >= 60) {
    return 'Good conditions for planting. Most indicators are favorable. Consider planting within the next few days.';
  } else if (score >= 40) {
    if (soilMoisture < 30) {
      return 'Wait until soil moisture improves. Consider irrigation or wait for rainfall before planting.';
    } else if (rainfall < 80) {
      return 'Rainfall levels are below optimal. Monitor weather forecasts and consider waiting for more rain.';
    } else if (vegetationIndex < 0.4) {
      return 'Soil health indicators suggest waiting. Consider soil preparation and nutrient management.';
    } else {
      return 'Conditions are marginal. Monitor closely and prepare for planting when conditions improve.';
    }
  } else {
    return 'Not recommended for planting. Multiple indicators are unfavorable. Wait for better conditions and monitor daily updates.';
  }
}

function generateRainfallTrend(): Array<{ month: string; rainfall: number }> {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const currentMonth = new Date().getMonth();

  return months.slice(Math.max(0, currentMonth - 5), currentMonth + 1).map((month, index) => {
    const baseRainfall = 80 + Math.sin(index * 0.5) * 40;
    const variation = (Math.random() - 0.5) * 30;
    return {
      month,
      rainfall: Math.max(20, Math.round(baseRainfall + variation)),
    };
  });
}
