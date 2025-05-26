<template>
  <Card class="scale-visualization-card" v-if="shouldShowVisualization">
    <template #title>
      <div class="visualization-header">
        <i class="pi pi-chart-bar visualization-icon"></i>
        <h3 class="visualization-title">{{ getVisualizationTitle() }}</h3>
      </div>
    </template>
    
    <template #content>
      <div class="visualization-content">
        <!-- Human Figure for dangerous categories -->
        <div v-if="isDangerousCategory" class="human-visualization">
          <div class="human-figure">
            <div class="body-part head" :class="getBodyPartClass('head')">
              <div class="face">
                <div class="eyes-container">
                  <div class="eye left-eye"></div>
                  <div class="eye right-eye"></div>
                </div>
                <div class="mouth"></div>
              </div>
            </div>
            <div class="body-part neck" :class="getBodyPartClass('neck')"></div>
            <div class="body-part torso" :class="getBodyPartClass('torso')"></div>
            <div class="arms-container">
              <div class="body-part arm left-arm" :class="getBodyPartClass('arms')"></div>
              <div class="body-part arm right-arm" :class="getBodyPartClass('arms')"></div>
            </div>
            <div class="body-part waist" :class="getBodyPartClass('waist')"></div>
            <div class="legs-container">
              <div class="body-part leg left-leg" :class="getBodyPartClass('legs')"></div>
              <div class="body-part leg right-leg" :class="getBodyPartClass('legs')"></div>
            </div>
            <div class="feet-container">
              <div class="body-part foot left-foot" :class="getBodyPartClass('feet')"></div>
              <div class="body-part foot right-foot" :class="getBodyPartClass('feet')"></div>
            </div>
          </div>
          <div class="danger-info">
            <div class="danger-level" :class="getDangerLevelClass()">
              <i :class="getDangerIcon()"></i>
              <span>{{ getDangerText() }}</span>
            </div>
            <div class="danger-description">
              {{ getDangerDescription() }}
            </div>
          </div>
        </div>

        <!-- Scale comparison for non-dangerous categories -->
        <div v-else class="scale-comparison">
          <div class="scale-items">
            <div 
              v-for="item in getScaleItems()" 
              :key="item.name"
              class="scale-item"
              :class="{ 'scale-item--active': item.isActive }"
            >
              <div class="scale-icon">{{ item.icon }}</div>
              <div class="scale-name">{{ translateScaleItem(item.name) }}</div>
              <div class="scale-value">{{ item.value }}</div>
            </div>
          </div>
        </div>

        <!-- Larger beings for extreme values -->
        <div v-if="showLargerBeings" class="larger-beings">
          <h4 class="beings-title">{{ translate('extremeValues') }}</h4>
          <div class="beings-grid">
            <div 
              v-for="being in getLargerBeings()" 
              :key="being.name"
              class="being-item"
              :class="{ 'being-item--active': being.isActive }"
            >
              <div class="being-icon">{{ being.icon }}</div>
              <div class="being-name">{{ translateScaleItem(being.name) }}</div>
              <div class="being-description">{{ being.description }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'ScaleVisualization',
  computed: {
    ...mapState(['selectedCategory', 'fromValue', 'toValue', 'fromUnit', 'toUnit']),
    ...mapGetters(['translate', 'currentCategory', 'translateScaleItem']),
    
    shouldShowVisualization() {
      return this.fromValue && this.toValue && parseFloat(this.fromValue) > 0
    },
    
    isDangerousCategory() {
      return ['temperature', 'pressure', 'energy'].includes(this.selectedCategory)
    },
    
    showLargerBeings() {
      return this.isDangerousCategory && this.getDangerLevel() >= 5
    },
    
    currentValue() {
      return parseFloat(this.toValue) || 0
    }
  },
  
  watch: {
    toUnit() {
      // Force reactivity when unit changes
      this.$forceUpdate()
    },
    fromUnit() {
      // Force reactivity when unit changes
      this.$forceUpdate()
    },
    selectedCategory() {
      // Force reactivity when category changes
      this.$forceUpdate()
    }
  },
  
  methods: {
    getVisualizationTitle() {
      if (this.isDangerousCategory) {
        return this.translate('dangerScale')
      }
      return this.translate('scaleComparison')
    },
    
    getDangerLevel() {
      const value = this.currentValue
      const category = this.selectedCategory
      const unit = this.toUnit
      
      // Temperature danger levels (in Celsius)
      if (category === 'temperature') {
        if (unit === 'celsius') {
  
          if (value < 0 && value > -20) return 3// Cold
          if (value < 37) return 2 // Normal
          if (value < 50) return 3 // Hot
          if (value < 70) return 4 // Dangerous
          if (value < 100) return 5 // Lethal
          return 6 // Extreme
        }
        // Convert other units to Celsius for comparison
        let celsius = value
        if (unit === 'fahrenheit') celsius = (value - 32) * 5/9
        if (unit === 'kelvin') celsius = value - 273.15
        
        if (celsius < 0) return 1
        if (celsius < 37) return 2
        if (celsius < 50) return 3
        if (celsius < 70) return 4
        if (celsius < 100) return 5
        return 6
      }
      
      // Pressure danger levels (in Pascal)
      if (category === 'pressure') {
        let pascals = value
        if (unit === 'kilopascal') pascals = value * 1000
        if (unit === 'bar') pascals = value * 100000
        if (unit === 'atmosphere') pascals = value * 101325
        if (unit === 'psi') pascals = value * 6895
        
        if (pascals < 101325) return 1 // Below atmospheric
        if (pascals < 200000) return 2 // Safe
        if (pascals < 500000) return 3 // Uncomfortable
        if (pascals < 1000000) return 4 // Dangerous
        if (pascals < 5000000) return 5 // Lethal
        return 6 // Extreme
      }
      
      // Energy danger levels (in Joules)
      if (category === 'energy') {
        let joules = value
        if (unit === 'kilojoule') joules = value * 1000
        if (unit === 'calorie') joules = value * 4.184
        if (unit === 'kilocalorie') joules = value * 4184
        
        if (joules < 1) return 1 // Minimal
        if (joules < 100) return 2 // Low
        if (joules < 1000) return 3 // Moderate
        if (joules < 10000) return 4 // High
        if (joules < 100000) return 5 // Dangerous
        return 6 // Lethal
      }
      
      return 1
    },
    
    getBodyPartClass(part) {
      const level = this.getDangerLevel()
      const partLevels = {
        feet: 1,
        legs: 2,
        waist: 3,
        arms: 4,
        torso: 5,
        neck: 5,
        head: 6
      }
      
      if (level >= partLevels[part]) {
        if (level <= 2) return 'safe'
        if (level <= 3) return 'caution'
        if (level <= 4) return 'warning'
        if (level <= 5) return 'danger'
        return 'extreme'
      }
      return 'inactive'
    },
    
    getDangerLevelClass() {
      const level = this.getDangerLevel()
      if (level <= 2) return 'level-safe'
      if (level <= 3) return 'level-caution'
      if (level <= 4) return 'level-warning'
      if (level <= 5) return 'level-danger'
      return 'level-extreme'
    },
    
    getDangerIcon() {
      const level = this.getDangerLevel()
      if (level <= 2) return 'pi pi-check-circle'
      if (level <= 3) return 'pi pi-exclamation-triangle'
      if (level <= 4) return 'pi pi-times-circle'
      if (level <= 5) return 'pi pi-ban'
      return 'pi pi-skull'
    },
    
    getDangerText() {
      const level = this.getDangerLevel()
      if (level <= 2) return this.translate('safe')
      if (level <= 3) return this.translate('caution')
      if (level <= 4) return this.translate('warning')
      if (level <= 5) return this.translate('danger')
      return this.translate('extreme')
    },
    
    getDangerDescription() {
      const level = this.getDangerLevel()
      const category = this.selectedCategory
      
      if (category === 'temperature') {
        if (level <= 2) return this.translate('tempSafe')
        if (level <= 3) return this.translate('tempHot')
        if (level <= 4) return this.translate('tempDangerous')
        if (level <= 5) return this.translate('tempLethal')
        return this.translate('tempExtreme')
      }
      
      if (category === 'pressure') {
        if (level <= 2) return this.translate('pressureSafe')
        if (level <= 3) return this.translate('pressureUncomfortable')
        if (level <= 4) return this.translate('pressureDangerous')
        if (level <= 5) return this.translate('pressureLethal')
        return this.translate('pressureExtreme')
      }
      
      if (category === 'energy') {
        if (level <= 2) return this.translate('energyLow')
        if (level <= 3) return this.translate('energyModerate')
        if (level <= 4) return this.translate('energyHigh')
        if (level <= 5) return this.translate('energyDangerous')
        return this.translate('energyLethal')
      }
      
      return ''
    },
    
    getScaleItems() {
      const value = this.currentValue
      const category = this.selectedCategory
      
      if (category === 'length') {
        // Convert to meters for comparison
        let meters = value
        if (this.toUnit === 'kilometer') meters = value * 1000
        if (this.toUnit === 'centimeter') meters = value / 100
        if (this.toUnit === 'millimeter') meters = value / 1000
        if (this.toUnit === 'inch') meters = value * 0.0254
        if (this.toUnit === 'foot') meters = value * 0.3048
        if (this.toUnit === 'yard') meters = value * 0.9144
        if (this.toUnit === 'mile') meters = value * 1609.34
        
        const items = [
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
        ]
        
        return items.map(item => ({
          ...item,
          isActive: meters >= item.threshold
        }))
      }
      
      if (category === 'weight') {
        // Convert to kilograms for comparison
        let kg = value
        if (this.toUnit === 'gram') kg = value / 1000
        if (this.toUnit === 'pound') kg = value * 0.453592
        if (this.toUnit === 'ounce') kg = value * 0.0283495
        if (this.toUnit === 'ton') kg = value * 1000
        if (this.toUnit === 'stone') kg = value * 6.35029
        
        const items = [
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
        ]
        
        return items.map(item => ({
          ...item,
          isActive: kg >= item.threshold
        }))
      }
      
      if (category === 'volume') {
        // Convert to liters for comparison
        let liters = value
        if (this.toUnit === 'milliliter') liters = value / 1000
        if (this.toUnit === 'gallon') liters = value * 3.78541
        if (this.toUnit === 'quart') liters = value * 0.946353
        if (this.toUnit === 'pint') liters = value * 0.473176
        if (this.toUnit === 'cup') liters = value * 0.236588
        if (this.toUnit === 'fluid_ounce') liters = value * 0.0295735
        if (this.toUnit === 'cubic_meter') liters = value * 1000
        
        const items = [
          { name: 'teaspoon', icon: '🥄', value: '5 mL', threshold: 0.005 },
          { name: 'shotGlass', icon: '🥃', value: '50 mL', threshold: 0.05 },
          { name: 'cup', icon: '☕', value: '250 mL', threshold: 0.25 },
          { name: 'bottle', icon: '🍼', value: '500 mL', threshold: 0.5 },
          { name: 'milkJug', icon: '🥛', value: '1 L', threshold: 1 },
          { name: 'bucket', icon: '🪣', value: '10 L', threshold: 10 },
          { name: 'bathtub', icon: '🛁', value: '300 L', threshold: 300 },
          { name: 'hotTub', icon: '🛀', value: '1,500 L', threshold: 1500 },
          { name: 'pool', icon: '🏊', value: '50,000 L', threshold: 50000 }
        ]
        
        return items.map(item => ({
          ...item,
          isActive: liters >= item.threshold
        }))
      }
      
      if (category === 'area') {
        // Convert to square meters for comparison
        let sqm = value
        if (this.toUnit === 'square_kilometer') sqm = value * 1000000
        if (this.toUnit === 'square_centimeter') sqm = value / 10000
        if (this.toUnit === 'square_inch') sqm = value * 0.00064516
        if (this.toUnit === 'square_foot') sqm = value * 0.092903
        if (this.toUnit === 'acre') sqm = value * 4046.86
        if (this.toUnit === 'hectare') sqm = value * 10000
        
        const items = [
          { name: 'stamp', icon: '📮', value: '4 cm²', threshold: 0.0004 },
          { name: 'phone', icon: '📱', value: '100 cm²', threshold: 0.01 },
          { name: 'sheet', icon: '📄', value: '0.06 m²', threshold: 0.06 },
          { name: 'door', icon: '🚪', value: '2 m²', threshold: 2 },
          { name: 'room', icon: '🏠', value: '20 m²', threshold: 20 },
          { name: 'house', icon: '🏡', value: '150 m²', threshold: 150 },
          { name: 'footballField', icon: '🏈', value: '5,351 m²', threshold: 5351 },
          { name: 'cityBlock', icon: '🏙️', value: '1 hectare', threshold: 10000 },
          { name: 'centralPark', icon: '🌳', value: '341 hectares', threshold: 3410000 }
        ]
        
        return items.map(item => ({
          ...item,
          isActive: sqm >= item.threshold
        }))
      }
      
      if (category === 'speed') {
        // Convert to m/s for comparison
        let ms = value
        if (this.toUnit === 'kilometer_per_hour') ms = value / 3.6
        if (this.toUnit === 'mile_per_hour') ms = value * 0.44704
        if (this.toUnit === 'foot_per_second') ms = value * 0.3048
        if (this.toUnit === 'knot') ms = value * 0.514444
        
        const items = [
          { name: 'walking', icon: '🚶', value: '1.4 m/s', threshold: 1.4 },
          { name: 'running', icon: '🏃', value: '5 m/s', threshold: 5 },
          { name: 'cycling', icon: '🚴', value: '10 m/s', threshold: 10 },
          { name: 'carCity', icon: '🚗', value: '14 m/s', threshold: 14 },
          { name: 'carHighway', icon: '🛣️', value: '28 m/s', threshold: 28 },
          { name: 'cheetah', icon: '🐆', value: '30 m/s', threshold: 30 },
          { name: 'train', icon: '🚄', value: '83 m/s', threshold: 83 },
          { name: 'airplane', icon: '✈️', value: '250 m/s', threshold: 250 },
          { name: 'sound', icon: '🔊', value: '343 m/s', threshold: 343 }
        ]
        
        return items.map(item => ({
          ...item,
          isActive: ms >= item.threshold
        }))
      }
      
      return []
    },
    
    getLargerBeings() {
      const level = this.getDangerLevel()
      
      if (level >= 5) {
        return [
          { 
            name: 'elephant', 
            icon: '🐘', 
            description: this.translate('elephantDescription'),
            isActive: level >= 5 
          },
          { 
            name: 'whale', 
            icon: '🐋', 
            description: this.translate('whaleDescription'),
            isActive: level >= 6 
          }
        ]
      }
      
      return []
    }
  }
}
</script>

<style scoped>
.scale-visualization-card {
  background: #ffffff !important;
  border: 1px solid #e2e8f0 !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08) !important;
  margin-top: 24px;
}

.scale-visualization-card :deep(.p-card-content) {
  padding: 24px !important;
}

.scale-visualization-card :deep(.p-card-title) {
  padding: 20px 24px 0 24px !important;
}

.dark .scale-visualization-card {
  background: #1e293b !important;
  border-color: #334155 !important;
}

.visualization-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.visualization-icon {
  font-size: 24px;
  color: #3b82f6;
}

.visualization-title {
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
}

.dark .visualization-title {
  color: #f9fafb;
}

.visualization-content {
  padding: 8px;
}

.human-visualization {
  display: flex;
  gap: 40px;
  align-items: flex-start;
  justify-content: center;
  padding: 20px;
}

.human-figure {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 20px;
}

.body-part {
  transition: all 0.3s ease;
  border: 2px solid #e5e7eb;
  position: relative;
}

/* Head */
.head {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2px;
}

.face {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  width: 100%;
  height: 100%;
  justify-content: center;
}

.eye {
  width: 3px;
  height: 3px;
  background: #374151;
  border-radius: 50%;
  display: inline-block;
}

.eyes-container {
  display: flex;
  gap: 6px;
  align-items: center;
}

.left-eye,
.right-eye {
  margin: 0;
}

.mouth {
  width: 6px;
  height: 2px;
  background: #374151;
  border-radius: 0 0 6px 6px;
  margin-top: 1px;
}

/* Neck */
.neck {
  width: 20px;
  height: 15px;
  border-radius: 8px;
}

/* Torso */
.torso {
  width: 60px;
  height: 80px;
  border-radius: 15px;
  margin: 2px 0;
}

/* Arms */
.arms-container {
  display: flex;
  justify-content: space-between;
  width: 80px;
  margin-top: -20px;
  margin-bottom: 10px;
  position: relative;
}

.arm {
  width: 12px;
  height: 45px;
  border-radius: 6px;
}

.left-arm {
  transform: rotate(-10deg);
  transform-origin: top center;
  margin-left: 5px;
}

.right-arm {
  transform: rotate(10deg);
  transform-origin: top center;
  margin-right: 5px;
}

/* Waist */
.waist {
  width: 50px;
  height: 20px;
  border-radius: 10px;
}

/* Legs */
.legs-container {
  display: flex;
  gap: 8px;
  margin-top: 2px;
}

.leg {
  width: 18px;
  height: 70px;
  border-radius: 9px;
}

/* Feet */
.feet-container {
  display: flex;
  gap: 8px;
  margin-top: 2px;
}

.foot {
  width: 25px;
  height: 12px;
  border-radius: 6px;
}

.body-part.inactive {
  background: #f3f4f6;
  border-color: #e5e7eb;
}

.body-part.safe {
  background: #dcfce7;
  border-color: #22c55e;
}

.body-part.caution {
  background: #fef3c7;
  border-color: #f59e0b;
}

.body-part.warning {
  background: #fed7aa;
  border-color: #ea580c;
}

.body-part.danger {
  background: #fecaca;
  border-color: #ef4444;
}

.body-part.extreme {
  background: #fda4af;
  border-color: #dc2626;
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

.danger-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.danger-level {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 12px;
  font-weight: 600;
  margin-bottom: 12px;
}

.level-safe {
  background: #dcfce7;
  color: #166534;
}

.level-caution {
  background: #fef3c7;
  color: #92400e;
}

.level-warning {
  background: #fed7aa;
  color: #c2410c;
}

.level-danger {
  background: #fecaca;
  color: #dc2626;
}

.level-extreme {
  background: #fda4af;
  color: #991b1b;
}

.danger-description {
  color: #6b7280;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
}

.dark .danger-description {
  color: #9ca3af;
}

.scale-comparison {
  width: 100%;
}

.scale-items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
}

.scale-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 16px;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  background: #f9fafb;
  transition: all 0.3s ease;
}

.scale-item--active {
  border-color: #3b82f6;
  background: #eff6ff;
  transform: scale(1.05);
}

.dark .scale-item {
  background: #374151;
  border-color: #4b5563;
}

.dark .scale-item--active {
  border-color: #60a5fa;
  background: #1e3a8a;
}

.scale-icon {
  font-size: 32px;
  margin-bottom: 8px;
}

.scale-name {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.dark .scale-name {
  color: #f9fafb;
}

.scale-value {
  font-size: 12px;
  color: #6b7280;
}

.dark .scale-value {
  color: #9ca3af;
}

.larger-beings {
  margin-top: 24px;
  padding-top: 24px;
  border-top: 1px solid #e5e7eb;
}

.dark .larger-beings {
  border-top-color: #4b5563;
}

.beings-title {
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 16px;
}

.dark .beings-title {
  color: #f9fafb;
}

.beings-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.being-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 20px;
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  background: #f9fafb;
  transition: all 0.3s ease;
}

.being-item--active {
  border-color: #dc2626;
  background: #fef2f2;
}

.dark .being-item {
  background: #374151;
  border-color: #4b5563;
}

.dark .being-item--active {
  border-color: #ef4444;
  background: #7f1d1d;
}

.being-icon {
  font-size: 32px;
  flex-shrink: 0;
}

.being-name {
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 4px;
}

.dark .being-name {
  color: #f9fafb;
}

.being-description {
  font-size: 12px;
  color: #6b7280;
}

.dark .being-description {
  color: #9ca3af;
}

/* Responsive design */
@media (max-width: 1024px) {
  .human-visualization {
    gap: 30px;
    padding: 15px;
  }
  
  .scale-items {
    grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
  }
}

@media (max-width: 768px) {
  .human-visualization {
    flex-direction: column;
    gap: 20px;
    padding: 10px;
  }
  
  .human-figure {
    padding: 15px;
  }
  
  .scale-items {
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    gap: 12px;
  }
  
  .beings-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .human-figure {
    padding: 10px;
    transform: scale(0.9);
  }
  
  .head {
    width: 45px;
    height: 45px;
  }
  
  .torso {
    width: 55px;
    height: 70px;
  }
  
  .arms-container {
    width: 90px;
  }
  
  .arm {
    width: 13px;
    height: 50px;
  }
  
  .leg {
    width: 16px;
    height: 60px;
  }
}
</style> 