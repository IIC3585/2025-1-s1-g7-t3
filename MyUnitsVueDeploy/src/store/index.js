import { createStore } from 'vuex'

// Unit conversion factors (all relative to base units)
const conversionFactors = {
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
    celsius: { base: true },
    fahrenheit: { 
      toBase: (f) => (f - 32) * 5/9,
      fromBase: (c) => c * 9/5 + 32
    },
    kelvin: {
      toBase: (k) => k - 273.15,
      fromBase: (c) => c + 273.15
    }
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
}

// Translations
const translations = {
  en: {
    appTitle: 'UnitPro',
    appTagline: 'Professional Unit Converter',
    selectCategory: 'Unit Categories',
    categoryDescription: 'Choose a measurement category to begin converting',
    from: 'From',
    to: 'To',
    enterValue: 'Enter value',
    result: 'Result',
    conversionRate: 'Conversion Rate',
    swapUnits: 'Swap units',
    units: 'units',
    categories: {
      length: { name: 'Length', description: 'Convert between different length units' },
      weight: { name: 'Weight', description: 'Convert between different weight units' },
      volume: { name: 'Volume', description: 'Convert between different volume units' },
      temperature: { name: 'Temperature', description: 'Convert between different temperature units' },
      pressure: { name: 'Pressure', description: 'Convert between different pressure units' },
      area: { name: 'Area', description: 'Convert between different area units' },
      speed: { name: 'Speed', description: 'Convert between different speed units' },
      energy: { name: 'Energy', description: 'Convert between different energy units' }
    },
    unitNames: {
      // Length
      meter: 'Meter',
      kilometer: 'Kilometer',
      centimeter: 'Centimeter',
      millimeter: 'Millimeter',
      inch: 'Inch',
      foot: 'Foot',
      yard: 'Yard',
      mile: 'Mile',
      // Weight
      kilogram: 'Kilogram',
      gram: 'Gram',
      pound: 'Pound',
      ounce: 'Ounce',
      ton: 'Ton',
      stone: 'Stone',
      // Volume
      liter: 'Liter',
      milliliter: 'Milliliter',
      gallon: 'Gallon',
      quart: 'Quart',
      pint: 'Pint',
      cup: 'Cup',
      fluid_ounce: 'Fluid Ounce',
      cubic_meter: 'Cubic Meter',
      // Temperature
      celsius: 'Celsius',
      fahrenheit: 'Fahrenheit',
      kelvin: 'Kelvin',
      // Pressure
      pascal: 'Pascal',
      kilopascal: 'Kilopascal',
      bar: 'Bar',
      atmosphere: 'Atmosphere',
      psi: 'PSI',
      torr: 'Torr',
      // Area
      square_meter: 'Square Meter',
      square_kilometer: 'Square Kilometer',
      square_centimeter: 'Square Centimeter',
      square_inch: 'Square Inch',
      square_foot: 'Square Foot',
      acre: 'Acre',
      hectare: 'Hectare',
      // Speed
      meter_per_second: 'Meter per Second',
      kilometer_per_hour: 'Kilometer per Hour',
      mile_per_hour: 'Mile per Hour',
      foot_per_second: 'Foot per Second',
      knot: 'Knot',
      // Energy
      joule: 'Joule',
      kilojoule: 'Kilojoule',
      calorie: 'Calorie',
      kilocalorie: 'Kilocalorie',
      watt_hour: 'Watt Hour',
      kilowatt_hour: 'Kilowatt Hour',
      btu: 'BTU'
    }
  },
  es: {
    appTitle: 'UnitPro',
    appTagline: 'Conversor Profesional de Unidades',
    selectCategory: 'Categorías de Unidades',
    categoryDescription: 'Elige una categoría de medición para comenzar a convertir',
    from: 'De',
    to: 'A',
    enterValue: 'Ingresa valor',
    result: 'Resultado',
    conversionRate: 'Tasa de Conversión',
    swapUnits: 'Intercambiar unidades',
    units: 'unidades',
    categories: {
      length: { name: 'Longitud', description: 'Convierte entre diferentes unidades de longitud' },
      weight: { name: 'Peso', description: 'Convierte entre diferentes unidades de peso' },
      volume: { name: 'Volumen', description: 'Convierte entre diferentes unidades de volumen' },
      temperature: { name: 'Temperatura', description: 'Convierte entre diferentes unidades de temperatura' },
      pressure: { name: 'Presión', description: 'Convierte entre diferentes unidades de presión' },
      area: { name: 'Área', description: 'Convierte entre diferentes unidades de área' },
      speed: { name: 'Velocidad', description: 'Convierte entre diferentes unidades de velocidad' },
      energy: { name: 'Energía', description: 'Convierte entre diferentes unidades de energía' }
    },
    unitNames: {
      // Length
      meter: 'Metro',
      kilometer: 'Kilómetro',
      centimeter: 'Centímetro',
      millimeter: 'Milímetro',
      inch: 'Pulgada',
      foot: 'Pie',
      yard: 'Yarda',
      mile: 'Milla',
      // Weight
      kilogram: 'Kilogramo',
      gram: 'Gramo',
      pound: 'Libra',
      ounce: 'Onza',
      ton: 'Tonelada',
      stone: 'Piedra',
      // Volume
      liter: 'Litro',
      milliliter: 'Mililitro',
      gallon: 'Galón',
      quart: 'Cuarto',
      pint: 'Pinta',
      cup: 'Taza',
      fluid_ounce: 'Onza Líquida',
      cubic_meter: 'Metro Cúbico',
      // Temperature
      celsius: 'Celsius',
      fahrenheit: 'Fahrenheit',
      kelvin: 'Kelvin',
      // Pressure
      pascal: 'Pascal',
      kilopascal: 'Kilopascal',
      bar: 'Bar',
      atmosphere: 'Atmósfera',
      psi: 'PSI',
      torr: 'Torr',
      // Area
      square_meter: 'Metro Cuadrado',
      square_kilometer: 'Kilómetro Cuadrado',
      square_centimeter: 'Centímetro Cuadrado',
      square_inch: 'Pulgada Cuadrada',
      square_foot: 'Pie Cuadrado',
      acre: 'Acre',
      hectare: 'Hectárea',
      // Speed
      meter_per_second: 'Metro por Segundo',
      kilometer_per_hour: 'Kilómetro por Hora',
      mile_per_hour: 'Milla por Hora',
      foot_per_second: 'Pie por Segundo',
      knot: 'Nudo',
      // Energy
      joule: 'Julio',
      kilojoule: 'Kilojulio',
      calorie: 'Caloría',
      kilocalorie: 'Kilocaloría',
      watt_hour: 'Vatio Hora',
      kilowatt_hour: 'Kilovatio Hora',
      btu: 'BTU'
    }
  }
}

export default createStore({
  state: {
    selectedCategory: 'length',
    fromUnit: 'meter',
    toUnit: 'kilometer',
    fromValue: '',
    toValue: '',
    darkMode: false,
    language: 'en',
    categories: {
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
    }
  },
  
  mutations: {
    SET_CATEGORY(state, category) {
      state.selectedCategory = category
      const units = Object.keys(state.categories[category].units)
      state.fromUnit = units[0]
      state.toUnit = units[1] || units[0]
      state.fromValue = ''
      state.toValue = ''
    },
    
    SET_FROM_UNIT(state, unit) {
      state.fromUnit = unit
    },
    
    SET_TO_UNIT(state, unit) {
      state.toUnit = unit
    },
    
    SET_FROM_VALUE(state, value) {
      state.fromValue = value
    },
    
    SET_TO_VALUE(state, value) {
      state.toValue = value
    },
    
    SET_DARK_MODE(state, isDark) {
      state.darkMode = isDark
      // Apply theme to document
      if (isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    
    SET_LANGUAGE(state, language) {
      state.language = language
    },
    
    SWAP_UNITS(state) {
      const tempUnit = state.fromUnit
      const tempValue = state.fromValue
      
      state.fromUnit = state.toUnit
      state.toUnit = tempUnit
      state.fromValue = state.toValue
      state.toValue = tempValue
    }
  },
  
  actions: {
    convertFromTo({ commit, state }, value) {
      // Fixed: Allow 0 and negative values for temperature, only positive for others
      if (value === '' || value === null || value === undefined) {
        commit('SET_TO_VALUE', '')
        return
      }
      
      const numValue = parseFloat(value)
      if (isNaN(numValue)) {
        commit('SET_TO_VALUE', '')
        return
      }
      
      // Only allow negative values for temperature
      if (numValue < 0 && state.selectedCategory !== 'temperature') {
        commit('SET_TO_VALUE', '')
        return
      }
      
      const result = this.getters.convert(
        numValue,
        state.fromUnit,
        state.toUnit,
        state.selectedCategory
      )
      
      commit('SET_FROM_VALUE', value)
      commit('SET_TO_VALUE', result.toString())
    },
    
    convertToFrom({ commit, state }, value) {
      // Fixed: Allow 0 and negative values for temperature, only positive for others
      if (value === '' || value === null || value === undefined) {
        commit('SET_FROM_VALUE', '')
        return
      }
      
      const numValue = parseFloat(value)
      if (isNaN(numValue)) {
        commit('SET_FROM_VALUE', '')
        return
      }
      
      // Only allow negative values for temperature
      if (numValue < 0 && state.selectedCategory !== 'temperature') {
        commit('SET_FROM_VALUE', '')
        return
      }
      
      const result = this.getters.convert(
        numValue,
        state.toUnit,
        state.fromUnit,
        state.selectedCategory
      )
      
      commit('SET_TO_VALUE', value)
      commit('SET_FROM_VALUE', result.toString())
    },
    
    swapUnits({ commit, dispatch, state }) {
      commit('SWAP_UNITS')
      if (state.fromValue) {
        dispatch('convertFromTo', state.fromValue)
      }
    },
    
    toggleDarkMode({ commit, state }) {
      commit('SET_DARK_MODE', !state.darkMode)
    },
    
    setLanguage({ commit }, language) {
      commit('SET_LANGUAGE', language)
    }
  },
  
  getters: {
    currentCategory: (state) => state.categories[state.selectedCategory],
    
    currentTranslations: (state) => translations[state.language],
    
    translate: (state) => (key) => {
      const keys = key.split('.')
      let value = translations[state.language]
      for (const k of keys) {
        value = value?.[k]
      }
      return value || key
    },
    
    translateUnitName: (state) => (unitKey) => {
      return translations[state.language].unitNames[unitKey] || unitKey
    },
    
    convert: () => (value, fromUnit, toUnit, category) => {
      if (fromUnit === toUnit) return value
      
      const factors = conversionFactors[category]
      
      // Special handling for temperature
      if (category === 'temperature') {
        if (fromUnit === 'celsius') {
          if (toUnit === 'fahrenheit') {
            return factors.fahrenheit.fromBase(value)
          } else if (toUnit === 'kelvin') {
            return factors.kelvin.fromBase(value)
          }
        } else if (fromUnit === 'fahrenheit') {
          const celsius = factors.fahrenheit.toBase(value)
          if (toUnit === 'celsius') {
            return celsius
          } else if (toUnit === 'kelvin') {
            return factors.kelvin.fromBase(celsius)
          }
        } else if (fromUnit === 'kelvin') {
          const celsius = factors.kelvin.toBase(value)
          if (toUnit === 'celsius') {
            return celsius
          } else if (toUnit === 'fahrenheit') {
            return factors.fahrenheit.fromBase(celsius)
          }
        }
      } else {
        // Standard conversion through base unit
        const baseValue = value / factors[fromUnit]
        const result = baseValue * factors[toUnit]
        return Math.round(result * 1000000) / 1000000 // Round to 6 decimal places
      }
      
      return value
    }
  }
}) 