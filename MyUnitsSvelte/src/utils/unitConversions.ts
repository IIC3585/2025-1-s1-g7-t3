import type { UnitCategory } from './unitCategories';

export function convert(value: number, from: string, to: string, category: UnitCategory): number {
	if (category === 'temperature') {
		return temperatureConversion(value, from, to);
	}
	return linearConversion(value, from, to, category);
}

function linearConversion(
	value: number,
	from: string,
	to: string,
	category: UnitCategory
): number {
	const units = CONVERSIONS[category];
	return (value / (units as Record<string, number>)[from]) * (units as Record<string, number>)[to];
}

function temperatureConversion(
	value: number,
	from: string,
	to: string
): number {
	if (from === to) return value;

	// Convert to Celsius first
	let celsius = value;
	if (from === 'celsius (°C)') celsius = value;
	else if (from === 'fahrenheit (°F)') celsius = ((value - 32) * 5) / 9;
	else if (from === 'kelvin (K)') celsius = value - 273.15;

	// Convert from Celsius to target
	let result = celsius
	if (to === 'celsius (°C)') result = celsius;
	else if (to === 'fahrenheit (°F)') result = (celsius * 9) / 5 + 32;
	else if (to === 'kelvin (K)') result = celsius + 273.15;

	return result;
}

export const CONVERSIONS = {
	length: {
		meter: 1,
		kilometer: 0.001,
		centimeter: 100,
		millimeter: 1000,
		inch: 39.3701,
		foot: 3.28084,
		yard: 1.09361,
		mile: 0.000621371
	},
	weight: {
		kilogram: 1,
		gram: 1000,
		pound: 2.20462,
		ounce: 35.274,
		ton: 0.001,
		stone: 0.157473
	},
	volume: {
		liter: 1,
		milliliter: 1000,
		gallon: 0.264172,
		quart: 1.05669,
		pint: 2.11338,
		cup: 4.22675,
		fluid_ounce: 33.814,
		cubic_meter: 0.001
	},
	temperature: {
		celsius: 'celsius',
		fahrenheit: 'fahrenheit',
		kelvin: 'kelvin'
	},
	pressure: {
		pascal: 1,
		kilopascal: 0.001,
		bar: 0.00001,
		atmosphere: 0.00000986923,
		psi: 0.000145038,
		torr: 0.00750062
	},
	area: {
		square_meter: 1,
		square_kilometer: 0.000001,
		square_centimeter: 10000,
		square_inch: 1550.0031,
		square_foot: 10.7639,
		acre: 0.000247105,
		hectare: 0.0001
	},
	speed: {
		meter_per_second: 1,
		kilometer_per_hour: 3.6,
		mile_per_hour: 2.23694,
		foot_per_second: 3.28084,
		knot: 1.94384
	},
	energy: {
		joule: 1,
		kilojoule: 0.001,
		calorie: 0.239006,
		kilocalorie: 0.000239006,
		watt_hour: 0.000277778,
		kilowatt_hour: 0.000000277778,
		btu: 0.000947817
	}
};
