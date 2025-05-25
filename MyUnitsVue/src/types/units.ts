export type UnitType = 'distance' | 'area' | 'volume' | 'temperature' | 'weight' | 'pressure';

export interface UnitOption {
  value: string;
  label: string;
}

export interface UnitOptions {
  [key: string]: UnitOption[];
}

export interface ConversionFactors {
  [unit: string]: number;
}

export interface TemperatureConversion {
  toBase: (value: number) => number;
  fromBase: (value: number) => number;
}

export interface ConversionData {
  [unitType: string]: {
    baseUnit: string;
    factors: ConversionFactors;
    specialConversions?: {
      [unit: string]: TemperatureConversion;
    };
  };
}