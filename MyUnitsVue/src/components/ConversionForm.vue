<script setup lang="ts">
import { computed, ref } from 'vue';
import { UnitOption } from '../types/units';

const props = defineProps<{
  direction: 'from' | 'to';
  value: number | null;
  unit: string;
  units: UnitOption[];
}>();

const emit = defineEmits<{
  'update:value': [number | null];
  'update:unit': [string];
  'convert': [];
}>();

const copySuccess = ref(false);

const title = computed(() => {
  return props.direction === 'from' ? 'From' : 'To';
});

const formattedValue = computed(() => {
  if (props.value === null) return '';
  return props.value.toString();
});

const handleInputChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const value = target.value ? parseFloat(target.value) : null;
  emit('update:value', value);
};

const handleUnitChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:unit', target.value);
};

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    emit('convert');
  }
};

const copyToClipboard = async () => {
  if (props.value === null) return;
  
  try {
    await navigator.clipboard.writeText(formattedValue.value);
    copySuccess.value = true;
    setTimeout(() => {
      copySuccess.value = false;
    }, 2000);
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};
</script>

<template>
  <div class="conversion-form" :class="direction">
    <h3>{{ title }}</h3>
    <div class="input-group">
      <input
        type="number"
        :value="value"
        @input="handleInputChange"
        @keypress="handleKeyPress"
        class="value-input"
        placeholder="Enter value"
        step="any"
      />
      <select
        :value="unit"
        @change="handleUnitChange"
        class="unit-select"
      >
        <option
          v-for="unitOption in units"
          :key="unitOption.value"
          :value="unitOption.value"
        >
          {{ unitOption.label }}
        </option>
      </select>
    </div>
    <button 
          v-if="value !== null"
          @click="copyToClipboard" 
          class="copy-button"
          :class="{ 'success': copySuccess }"
          type="button"
          aria-label="Copy value"
        >
          <span v-if="!copySuccess">Copy</span>
          <span v-else>Copied!</span>
        </button>
  </div>
</template>

<style scoped>
.conversion-form {
  background-color: #F1F5F9;
  border-radius: var(--spacing-unit);
  padding: calc(var(--spacing-unit) * 2);
  transition: all 0.3s ease;
}

.conversion-form.from {
  border-left: 4px solid var(--primary-color);
}

.conversion-form.to {
  border-left: 4px solid var(--secondary-color);
}

h3 {
  margin-bottom: calc(var(--spacing-unit) * 1.5);
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--text-color);
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-unit);
}

.value-input, .unit-select {
  padding: calc(var(--spacing-unit) * 1.5);
  border: 1px solid var(--border-color);
  border-radius: calc(var(--spacing-unit) * 0.75);
  font-size: 1rem;
  width: 100%;
}

.value-input:focus, .unit-select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.copy-button {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 100px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: calc(var(--spacing-unit) * 0.5);
  padding: 10px 12px; /* Aumentado el padding vertical */
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: calc(var(--spacing-unit) * 1.5);
}

.copy-button:hover {
  background-color: #2563eb;
}

.copy-button.success {
  background-color: #10b981;
}


@media (min-width: 640px) {
  .input-group {
    flex-direction: row;
  }

  .value-input {
    flex: 3;
  }
  
  .unit-select {
    flex: 2;
  }
}
</style>