export type ScaleCategory = keyof typeof SCALES;
export type ScaleItem = {
  name: string;
  icon: string;
  value: string;
  threshold: number; // in meters, kilograms, liters, etc.
};
export enum ScalarCategories {
  length = 'length',
  weight = 'weight',
  volume = 'volume',
  area = 'area',
	speed = 'speed',
	temperature = 'temperature',
	pressure = 'pressure',
	energy = 'energy'
}

export const SCALES = {
	length: [
		{ name: 'virus', icon: '🦠', value: '0.1 μm', threshold: 0.0000001 },
		{ name: 'bacteria', icon: '🧫', value: '1 μm', threshold: 0.000001 },
		{ name: 'hair', icon: '💇', value: '100 μm', threshold: 0.0001 },
		{ name: 'ant', icon: '🐜', value: '5 mm', threshold: 0.005 },
		{ name: 'coin', icon: '🪙', value: '2 cm', threshold: 0.02 },
		{ name: 'hand', icon: '✋', value: '20 cm', threshold: 0.2 },
		{ name: 'person', icon: '🧍', value: '1.7 m', threshold: 1.7 },
		{ name: 'car', icon: '🚗', value: '4 m', threshold: 4 },
		{ name: 'house', icon: '🏠', value: '10 m', threshold: 10 },
		{ name: 'building', icon: '🏢', value: '100 m', threshold: 100 },
		{ name: 'mountain', icon: '🏔️', value: '8.8 km', threshold: 8800 },
		{ name: 'earth', icon: '🌍', value: '12,742 km', threshold: 12742000 }
	],
	weight: [
		{ name: 'feather', icon: '🪶', value: '1 g', threshold: 0.001 },
		{ name: 'coin', icon: '🪙', value: '10 g', threshold: 0.01 },
		{ name: 'phone', icon: '📱', value: '200 g', threshold: 0.2 },
		{ name: 'book', icon: '📚', value: '500 g', threshold: 0.5 },
		{ name: 'cat', icon: '🐱', value: '4 kg', threshold: 4 },
		{ name: 'person', icon: '🧍', value: '70 kg', threshold: 70 },
		{ name: 'piano', icon: '🎹', value: '300 kg', threshold: 300 },
		{ name: 'car', icon: '🚗', value: '1.5 t', threshold: 1500 },
		{ name: 'elephant', icon: '🐘', value: '6 t', threshold: 6000 },
		{ name: 'truck', icon: '🚛', value: '40 t', threshold: 40000 }
	],
	volume: [
		{ name: 'teaspoon', icon: '🥄', value: '5 mL', threshold: 0.005 },
		{ name: 'shotGlass', icon: '🥃', value: '50 mL', threshold: 0.05 },
		{ name: 'cup', icon: '☕', value: '250 mL', threshold: 0.25 },
		{ name: 'bottle', icon: '🍼', value: '500 mL', threshold: 0.5 },
		{ name: 'milkJug', icon: '🥛', value: '1 L', threshold: 1 },
		{ name: 'bucket', icon: '🪣', value: '10 L', threshold: 10 },
		{ name: 'bathtub', icon: '🛁', value: '300 L', threshold: 300 },
		{ name: 'hotTub', icon: '🛀', value: '1,500 L', threshold: 1500 },
		{ name: 'pool', icon: '🏊', value: '50,000 L', threshold: 50000 }
	],
	area: [
		{ name: 'stamp', icon: '📮', value: '4 cm²', threshold: 0.0004 },
		{ name: 'phone', icon: '📱', value: '100 cm²', threshold: 0.01 },
		{ name: 'sheet', icon: '📄', value: '0.06 m²', threshold: 0.06 },
		{ name: 'door', icon: '🚪', value: '2 m²', threshold: 2 },
		{ name: 'room', icon: '🏠', value: '20 m²', threshold: 20 },
		{ name: 'house', icon: '🏡', value: '150 m²', threshold: 150 },
		{ name: 'footballField', icon: '🏈', value: '5,351 m²', threshold: 5351 },
		{ name: 'cityBlock', icon: '🏙️', value: '1 hectare', threshold: 10000 },
		{ name: 'centralPark', icon: '🌳', value: '341 hectares', threshold: 3410000 }
	],
	speed: [
		{ name: 'walking', icon: '🚶', value: '1.4 m/s', threshold: 1.4 },
		{ name: 'running', icon: '🏃', value: '5 m/s', threshold: 5 },
		{ name: 'cycling', icon: '🚴', value: '10 m/s', threshold: 10 },
		{ name: 'carCity', icon: '🚗', value: '14 m/s', threshold: 14 },
		{ name: 'carHighway', icon: '🛣️', value: '28 m/s', threshold: 28 },
		{ name: 'cheetah', icon: '🐆', value: '30 m/s', threshold: 30 },
		{ name: 'train', icon: '🚄', value: '83 m/s', threshold: 83 },
		{ name: 'airplane', icon: '✈️', value: '250 m/s', threshold: 250 },
		{ name: 'sound', icon: '🔊', value: '343 m/s', threshold: 343 }
	],
	temperature: [
		{ name: 'freezing', icon: '❄️', value: '0 °C', threshold: 273.15 - 273.15 },
		{ name: 'roomTemp', icon: '🏠', value: '20 °C', threshold: 293.15 - 273.15 },
		{ name: 'bodyTemp', icon: '🧍‍♂️', value: '37 °C', threshold: 310.15 - 273.15 },
		{ name: 'boiling', icon: '♨️', value: '100 °C', threshold: 373.15 - 273.15 },
		{ name: 'oven', icon: '🔥', value: '200 °C', threshold: 473.15 - 273.15 },
		{ name: 'lava', icon: '🌋', value: '1,200 °C', threshold: 1473.15 - 273.15 },
		{ name: 'sunSurface', icon: '☀️', value: '5,500 °C', threshold: 5773.15 - 273.15 }
	],
	pressure: [
		{ name: 'vacuum', icon: '🌀', value: '0 Pa', threshold: 0 },
		{ name: 'space', icon: '🌌', value: '0.00001 Pa', threshold: 0.00001 },
		{ name: 'atmosphere', icon: '🌬️', value: '101.3 kPa', threshold: 101300 },
		{ name: 'bikeTire', icon: '🚲', value: '400 kPa', threshold: 400000 },
		{ name: 'carTire', icon: '🚗', value: '250 kPa', threshold: 250000 },
		{ name: 'deepOcean', icon: '🌊', value: '10 MPa', threshold: 10000000 },
		{ name: 'hydraulicPress', icon: '🛠️', value: '100 MPa', threshold: 100000000 }
	],
	energy: [
		{ name: 'joule', icon: '🔋', value: '1 J', threshold: 1 },
		{ name: 'lightbulb', icon: '💡', value: '60 J', threshold: 60 },
		{ name: 'phoneBattery', icon: '📱', value: '50,000 J', threshold: 50000 },
		{ name: 'carBattery', icon: '🔌', value: '1 MJ', threshold: 1000000 },
		{ name: 'meal', icon: '🍽️', value: '2,000 kcal', threshold: 8370000 },
		{ name: 'tnt', icon: '💣', value: '4.2 MJ', threshold: 4200000 },
		{ name: 'lightning', icon: '🌩️', value: '1 GJ', threshold: 1000000000 }
	]
};