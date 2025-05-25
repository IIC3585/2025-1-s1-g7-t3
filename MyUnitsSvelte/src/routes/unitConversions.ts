export type UnitCategory = keyof typeof unitCategories;

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
	const units = unitCategories[category];
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

export const unitCategories = {
	length: {
		'meters (m)': 1,
		'kilometers (km)': 0.001,
		'centimeters (cm)': 100,
		'milimeters (mm)': 1000,
		'micrometers (µm)': 1e6,
		'nanometers (nm)': 1e9,
		'miles (mi)': 0.000621371,
		'yards (yd)': 1.09361,
		'feet (ft)': 3.28084,
		'inches (in)': 39.3701,
		'nautical mile (NM)': 0.000539957,
		"Earth's distance from Sun (AU)": 6.68459e-12,
		'light year (ly)': 1.057000834e-13,
		'parsec (pc)': 3.240779289e-14
	},
	area: {
		'square meters (m^2)': 1,
		'square kilometers (km^2)': 1e-6,
		'square miles (mi^2)': 3.861e-7,
		'square yards (yd^2)': 1.19599,
		'square feet (ft^2)': 10.7639,
		'square inches (in^2)': 1550.0031,
		'hectare (ha)': 1e-4,
		'acre (ac)': 0.000247105,
		'Electron cross section': 1.503202964e28
	},
	volume: {
		'liter (L)': 1,
		'milliliter (mL)': 1000,
		'cubic meter (m^3)': 0.001,
		'cubic centimeter (cm^3)': 1000,
		'cubic inch (in^3)': 61.0237,
		'cubic foot (ft^3)': 35.3147,
		'gallons (gal)': 0.219969,
		'quarts (qt)': 0.879877,
		'pints (pt)': 1.75975,
		cups: 3.51951,
		'ounces (oz)': 35.1951,
		tablespoons: 56.3121,
		teaspoons: 168.936,
		"Earth's volume": 9.233610341e-25
	},
	mass: {
		'kilogram (kg)': 1,
		'gram (g)': 1000,
		'milligram (mg)': 1e6,
		'microgram (µg)': 1e9,
		'ton (t)': 0.001,
		'pound (lbs)': 2.20462,
		'ounce (oz)': 35.274,
		stone: 0.157473,
		"Earth's mass": 1.673360107e-25,
		"Sun's mass": 5e-31
	},
	pressure: {
		'pascal (Pa)': 1,
		bar: 0.00001,
		'pounds per square inch (psi)': 0.000145038,
		'atmosphere (atm)': 9.8692e-6,
		torr: 0.00750062
	},
	speed: {
		'meter per second (m/s)': 1,
		'kilometer per hour (km/h)': 3.6,
		'mile per hour (mi/h)': 2.23694,
		'foot per second (ft/s)': 3.28084,
		'knot (kt)': 1.94384,
		'speed of light (c)': 3.335640951e-9
	},
	time: {
		'second (s)': 1,
		'minute (min)': 1 / 60,
		'hour (h)': 1 / 3600,
		'day (d)': 1 / 86400,
		'millisecond (ms)': 1000,
		'microsecond (µs)': 1e6,
		'nanosecond (ns)': 1e9,
		week: 1 / 604800,
		month: 1 / 2592000,
		'year (y)': 1 / 31536000,
		decade: 1 / 315360000,
		century: 1 / 3153600000,
		millennium: 1 / 31536000000,
		'Planck time': 1.855094832e43
	},
	energy: {
		'joule (J)': 1,
		'kilojoule (kJ)': 0.001,
		'calorie (cal)': 0.239006,
		'kilocalorie (kcal)': 0.000239006,
		'watt hour (W*h)': 0.000277778,
		'kilowatt hour (kW*h)': 2.77778e-7,
		'British thermal unit (Btu)': 0.000947817,
		'electron volt (eV)': 6.242e18,
		therm: 9.478e-4,
		'foot pound (ft*lbf)': 0.737562
	},
	'data storage': {
		'byte (B)': 1,
		'bit (b)': 8,
		'kilobyte (kB)': 1e-3,
		'megabyte (MB)': 1e-6,
		'gigabyte (GB)': 1e-9,
		'terabyte (TB)': 1e-12,
		'petabyte (PB)': 1e-15,
		'exabyte (EB)': 1e-18,
		'zettabyte (ZB)': 1e-21,
		'yottabyte (YB)': 1e-24
	},
	temperature: {
		'celsius (°C)': 'celsius',
		'fahrenheit (°F)': 'fahrenheit',
		'kelvin (K)': 'kelvin'
	}
};
