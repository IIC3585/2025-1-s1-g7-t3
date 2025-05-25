import { UnitOptions } from '../types/units';

export const unitOptions: UnitOptions = {
  distance: [
    { value: 'mm', label: 'Millimeters (mm)' },
    { value: 'cm', label: 'Centimeters (cm)' },
    { value: 'm', label: 'Meters (m)' },
    { value: 'km', label: 'Kilometers (km)' },
    { value: 'in', label: 'Inches (in)' },
    { value: 'ft', label: 'Feet (ft)' },
    { value: 'mi', label: 'Miles (mi)' }
  ],
  area: [
    { value: 'mm2', label: 'Square Millimeters (mm²)' },
    { value: 'cm2', label: 'Square Centimeters (cm²)' },
    { value: 'm2', label: 'Square Meters (m²)' },
    { value: 'km2', label: 'Square Kilometers (km²)' },
    { value: 'ha', label: 'Hectare (ha)' },
    { value: 'in2', label: 'Square Inches (in²)' },
    { value: 'ft2', label: 'Square Feet (ft²)' }
  ],
  volume: [
    { value: 'ml', label: 'Milliliters (ml)' },
    { value: 'l', label: 'Liters (l)' },
    { value: 'm3', label: 'Cubic Meters (m³)' },
    { value: 'in3', label: 'Cubic Inches (in³)' },
    { value: 'ft3', label: 'Cubic Feet (ft³)' },
    { value: 'gal', label: 'Gallons (gal)' }
  ],
  temperature: [
    { value: 'c', label: 'Celsius (°C)' },
    { value: 'f', label: 'Fahrenheit (°F)' },
    { value: 'k', label: 'Kelvin (K)' }
  ],
  weight: [
    { value: 'g', label: 'Grams (g)' },
    { value: 'kg', label: 'Kilograms (kg)' },
    { value: 'lb', label: 'Pounds (lb)' },
    { value: 'oz', label: 'Ounces (oz)' }
  ],
  pressure: [
    { value: 'pa', label: 'Pascal (Pa)' },
    { value: 'kpa', label: 'Kilopascal (kPa)' },
    { value: 'mpa', label: 'Megapascal (MPa)' },
    { value: 'bar', label: 'Bar' },
    { value: 'psi', label: 'Pounds per Square Inch (PSI)' },
    { value: 'atm', label: 'Atmosphere (atm)' }
  ]
};