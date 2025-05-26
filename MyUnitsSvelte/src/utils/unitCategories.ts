export type UnitCategory = keyof typeof CATEGORIES;

export const CATEGORIES = {
	length: {
		name: 'Length',
		icon: '📏',
		units: {
			meter: 'm',
			kilometer: 'km',
			centimeter: 'cm',
			millimeter: 'mm',
			inch: 'in',
			foot: 'ft',
			yard: 'yd',
			mile: 'mi'
		}
	},
	weight: {
		name: 'Weight',
		icon: '⚖️',
		units: {
			kilogram: 'kg',
			gram: 'g',
			pound: 'lb',
			ounce: 'oz',
			ton: 't',
			stone: 'st'
		}
	},
	volume: {
		name: 'Volume',
		icon: '🥤',
		units: {
			liter: 'L',
			milliliter: 'mL',
			gallon: 'gal',
			quart: 'qt',
			pint: 'pt',
			cup: 'cup',
			fluid_ounce: 'fl oz',
			cubic_meter: 'm³'
		}
	},
	temperature: {
		name: 'Temperature',
		icon: '🌡️',
		units: {
			celsius: '°C',
			fahrenheit: '°F',
			kelvin: 'K'
		}
	},
	pressure: {
		name: 'Pressure',
		icon: '🌪️',
		units: {
			pascal: 'Pa',
			kilopascal: 'kPa',
			bar: 'bar',
			atmosphere: 'atm',
			psi: 'psi',
			torr: 'Torr'
		}
	},
	area: {
		name: 'Area',
		icon: '🗺️',
		units: {
			square_meter: 'm²',
			square_kilometer: 'km²',
			square_centimeter: 'cm²',
			square_inch: 'in²',
			square_foot: 'ft²',
			acre: 'acre',
			hectare: 'ha'
		}
	},
	speed: {
		name: 'Speed',
		icon: '🚗',
		units: {
			meter_per_second: 'm/s',
			kilometer_per_hour: 'km/h',
			mile_per_hour: 'mph',
			foot_per_second: 'ft/s',
			knot: 'knot'
		}
	},
	energy: {
		name: 'Energy',
		icon: '⚡',
		units: {
			joule: 'J',
			kilojoule: 'kJ',
			calorie: 'cal',
			kilocalorie: 'kcal',
			watt_hour: 'Wh',
			kilowatt_hour: 'kWh',
			btu: 'BTU'
		}
	}
};