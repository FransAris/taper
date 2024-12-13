import { findMedication } from './medications';

const HOURS_IN_DAY = 24;
const MINUTES_IN_HOUR = 60;

/**
 * Calculates the psychoactive effect level at a given time
 * Uses linear decline over the psychoactive duration
 */
const calculatePsychoactiveLevel = (dose, timeInHours, psychoactiveHours) => {
  if (timeInHours < 0) return 0;
  if (timeInHours > psychoactiveHours) return 0;
  
  return (1 - timeInHours / psychoactiveHours) * dose;
};

/**
 * Calculates the plasma level at a given time using half-life
 * Uses exponential decay: C(t) = C₀ * (1/2)^(t/t₁/₂)
 */
const calculatePlasmaLevel = (dose, timeInHours, halfLife) => {
  if (timeInHours < 0) return 0;
  
  return dose * Math.pow(0.5, timeInHours / halfLife);
};

/**
 * Generates time series data for graphing
 * @param {Array} doses - Array of dose records
 * @param {number} daysToShow - Number of days to calculate
 * @returns {Array} Time series data for graphing
 */
export const generateTimeSeriesData = (doses, daysToShow = 7) => {
  const now = new Date();
  const startTime = new Date(now - (daysToShow * HOURS_IN_DAY * MINUTES_IN_HOUR * 60 * 1000));
  const dataPoints = daysToShow * HOURS_IN_DAY; // One point per hour
  
  const timeSeriesData = [];
  
  for (let i = 0; i <= dataPoints; i++) {
    const timePoint = new Date(startTime.getTime() + (i * MINUTES_IN_HOUR * 60 * 1000));
    const dataPoint = {
      time: timePoint,
      psychoactiveLevel: 0,
      plasmaLevel: 0
    };
    
    // Calculate cumulative effects from all doses
    doses.forEach(dose => {
      const doseTime = new Date(dose.timestamp);
      const hoursSinceDose = (timePoint - doseTime) / (MINUTES_IN_HOUR * 60 * 1000);
      const medication = findMedication(dose.medicationName);
      
      if (medication) {
        dataPoint.psychoactiveLevel += calculatePsychoactiveLevel(
          dose.amount,
          hoursSinceDose,
          medication.psychoactiveHours
        );
        
        dataPoint.plasmaLevel += calculatePlasmaLevel(
          dose.amount,
          hoursSinceDose,
          medication.halfLife
        );
      }
    });
    
    timeSeriesData.push(dataPoint);
  }
  
  return timeSeriesData;
}; 