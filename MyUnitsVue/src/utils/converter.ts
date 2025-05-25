import { UnitType } from '../types/units';
import { conversionData } from './conversionData';

/**
 * Converts a value from one unit to another
 */
export function convert(
  value: number,
  fromUnit: string,
  toUnit: string,
  unitType: UnitType
): number {
  // If both units are the same, return the value
  if (fromUnit === toUnit) {
    return value;
  }

  const conversionInfo = conversionData[unitType];
  
  if (!conversionInfo) {
    console.error(`Unknown unit type: ${unitType}`);
    return 0;
  }

  const { baseUnit, factors, specialConversions } = conversionInfo;

  // If we have special conversions (like temperature)
  if (specialConversions) {
    if (specialConversions[fromUnit] && specialConversions[toUnit]) {
      // Convert to base unit first
      const baseValue = specialConversions[fromUnit].toBase(value);
      // Then convert from base to target
      return roundPrecision(specialConversions[toUnit].fromBase(baseValue));
    }
  }

  // Standard conversion using factors
  if (factors[fromUnit] && factors[toUnit]) {
    // Convert to base unit
    const valueInBaseUnit = value * factors[fromUnit];
    // Convert from base to target unit
    return roundPrecision(valueInBaseUnit / factors[toUnit]);
  }

  console.error(`Cannot convert from ${fromUnit} to ${toUnit}`);
  return 0;
}

/**
 * Rounds a number to a specific precision to avoid floating point errors
 * @param num The number to round
 * @param precision The number of decimal places (default: 12)
 */
function roundPrecision(num: number, precision: number = 12): number {
    // Handle special cases
    if (num === 0 || !isFinite(num)) return num;
    
    // For values very close to whole numbers, round them
    const rounded = Math.round(num);
    if (Math.abs(num - rounded) < 1e-10) {
      return rounded;
    }
    
    // For very small numbers that would be rounded to 0 but shouldn't be
    if (Math.abs(num) < 1e-10 && Math.abs(num) > 0) {
      // Return the original number for very small values
      return num;
    }
    
    // For very large or very small numbers, use toFixed and parse back to number
    // This handles better the string representation
    if (Math.abs(num) > 1e10 || Math.abs(num) < 1e-6) {
      return parseFloat(num.toFixed(precision));
    }
    
    // Otherwise, use specified precision with standard rounding
    const factor = Math.pow(10, precision);
    return Math.round(num * factor) / factor;
}