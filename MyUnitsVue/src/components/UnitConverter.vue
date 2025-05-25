<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import ConversionForm from './ConversionForm.vue';
import { UnitType, UnitOption } from '../types/units';
import { unitOptions } from '../constants/unitOptions';
import { convert } from '../utils/converter';

// elected unit type
const selectedUnitType = ref<UnitType>('distance');

// Options 
const unitTypeOptions = [
  { value: 'distance', label: 'Distance' },
  { value: 'area', label: 'Area' },
  { value: 'volume', label: 'Volume' },
  { value: 'temperature', label: 'Temperature' },
  { value: 'weight', label: 'Weight' },
  { value: 'pressure', label: 'Pressure' }
];

// Form values
const fromValue = ref<number | null>(null);
const toValue = ref<number | null>(null);
const fromUnit = ref<string>('');
const toUnit = ref<string>('');

// Unit options based on the selected type
const availableUnits = computed<UnitOption[]>(() => {
  return unitOptions[selectedUnitType.value] || [];
});

// Watch for changes in units and values
watch([fromUnit, toUnit, fromValue], () => {
  if (fromValue.value !== null) {
    handleFromConvert();
  }
});

watch([toValue], () => {
  if (toValue.value !== null) {
    handleToConvert();
  }
});

// Convert from source to target
const handleFromConvert = () => {
  if (fromValue.value !== null) {
    toValue.value = convert(
      fromValue.value,
      fromUnit.value,
      toUnit.value,
      selectedUnitType.value
    );
  }
};

// Convert from target to source
const handleToConvert = () => {
  if (toValue.value !== null) {
    fromValue.value = convert(
      toValue.value,
      toUnit.value,
      fromUnit.value,
      selectedUnitType.value
    );
  }
};

// General convert function to handle either direction
const handleConvert = () => {
  handleFromConvert();
};

// Set default units when unit type changes
watch(selectedUnitType, () => {
  if (availableUnits.value.length > 0) {
    fromUnit.value = availableUnits.value[0].value;
    toUnit.value = availableUnits.value[1].value;
    handleConvert();
  }
});

// Initialize default units
watch(availableUnits, (newUnits) => {
  if (newUnits.length > 0 && !fromUnit.value) {
    fromUnit.value = newUnits[0].value;
    toUnit.value = newUnits[1].value;
    handleConvert();
  }
}, { immediate: true });
</script>

<template>
  <div class="unit-converter">
    <div class="unit-type-selector">
      <label for="unit-type">Select unit type:</label>
      <select 
        id="unit-type" 
        v-model="selectedUnitType"
        class="select-input"
      >
        <option 
          v-for="option in unitTypeOptions" 
          :key="option.value" 
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>

    <div class="converter-container">
      <ConversionForm
        direction="from"
        v-model:value="fromValue"
        v-model:unit="fromUnit"
        :units="availableUnits"
        @convert="handleFromConvert"
      />

      <div class="direction-icon">
        <span>⟷</span>
      </div>

      <ConversionForm
        direction="to"
        v-model:value="toValue"
        v-model:unit="toUnit"
        :units="availableUnits"
        @convert="handleToConvert"
      />
    </div>
  </div>
</template>

<style scoped>
.unit-converter {
  background-color: var(--card-background);
  border-radius: calc(var(--spacing-unit) * 2);
  box-shadow: 0 calc(var(--spacing-unit) * 0.5) calc(var(--spacing-unit) * 2) rgba(0, 0, 0, 0.1);
  padding: calc(var(--spacing-unit) * 3);
}

.unit-type-selector {
  margin-bottom: calc(var(--spacing-unit) * 3);
}

.unit-type-selector label {
  display: block;
  margin-bottom: var(--spacing-unit);
  font-weight: 500;
}

.select-input {
  width: 100%;
  padding: calc(var(--spacing-unit) * 1.5);
  border: 1px solid var(--border-color);
  border-radius: calc(var(--spacing-unit) * 0.75);
  font-size: 1rem;
  background-color: white;
  color: var(--text-color);
  cursor: pointer;
}

.select-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.converter-container {
  display: flex;
  flex-direction: column;
  gap: calc(var(--spacing-unit) * 1);
}

.direction-icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: calc(var(--spacing-unit) * 0.5) 0;
  font-size: 1.5rem;
  color: var(--secondary-color);
}

@media (min-width: 640px) {
  .converter-container {
    flex-direction: row;
    align-items: center;
  }

  .direction-icon {
    margin: 0 calc(var(--spacing-unit) * 4);
    flex: 0 0 auto; 
  }

  /* Selecciona específicamente los ConversionForm */
  .converter-container > *:not(.direction-icon) {
    flex: 1; 
  }
}
</style>