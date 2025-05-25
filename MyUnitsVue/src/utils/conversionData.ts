import { ConversionData } from '../types/units';

export const conversionData: ConversionData = {
  distance: {
    baseUnit: 'm',
    factors: {
      mm: 0.001,
      cm: 0.01,
      m: 1,
      km: 1000,
      in: 0.0254,
      ft: 0.3048,
      mi: 1609.344
    }
  },
  area: {
    baseUnit: 'm2',
    factors: {
      mm2: 0.000001,
      cm2: 0.0001,
      m2: 1,
      ha: 10000,
      km2: 1000000,
      in2: 0.00064516,
      ft2: 0.09290304
    }
  },
  volume: {
    baseUnit: 'l',
    factors: {
      ml: 0.001,
      l: 1,
      m3: 1000,
      in3: 0.016387064,
      ft3: 28.3168466,
      gal: 3.78541178
    }
  },
  temperature: {
    baseUnit: 'k',
    factors: {},
    specialConversions: {
      c: {
        toBase: (celsius) => celsius + 273.15,
        fromBase: (kelvin) => kelvin - 273.15
      },
      f: {
        toBase: (fahrenheit) => (fahrenheit - 32) * 5/9 + 273.15,
        fromBase: (kelvin) => (kelvin - 273.15) * 9/5 + 32
      },
      k: {
        toBase: (kelvin) => kelvin,
        fromBase: (kelvin) => kelvin
      }
    }
  },
  weight: {
    baseUnit: 'kg',
    factors: {
      g: 0.001,
      kg: 1,
      lb: 0.45359237,
      oz: 0.028349523125
    }
  },
  pressure: {
    baseUnit: 'pa',
    factors: {
      pa: 1,
      kpa: 1000,
      mpa: 1000000,
      bar: 100000,
      psi: 6894.76,
      atm: 101325
    }
  }
};