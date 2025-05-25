<template>
  <Card class="unit-converter-card" v-if="selectedCategory">
    <template #title>
      <div class="converter-header">
        <div class="header-icon">{{ currentCategory.icon }}</div>
        <div class="header-content">
          <h2 class="converter-title">{{ getTranslatedCategoryName(selectedCategory) }}</h2>
          <p class="converter-description">{{ getTranslatedCategoryDescription(selectedCategory) }}</p>
        </div>
      </div>
    </template>
    
    <template #content>
      <div class="converter-body">
        <div class="conversion-grid">
          <!-- From Unit Section -->
          <div class="conversion-section">
            <div class="section-header">
              <label class="section-label">{{ translate('from') }}</label>
            </div>
            
            <Select
              v-model="fromUnit"
              :options="unitOptions"
              optionLabel="label"
              optionValue="value"
              class="unit-select"
              :placeholder="translate('from')"
            />
            
            <div class="input-wrapper">
              <InputNumber
                v-model="fromValueNumber"
                @input="onFromValueChange"
                class="unit-input"
                :placeholder="translate('enterValue')"
                :min="selectedCategory === 'temperature' ? undefined : 0"
                :maxFractionDigits="6"
                :useGrouping="false"
                fluid
              />
              <span class="input-unit-label">{{ currentCategory.units[fromUnit] }}</span>
            </div>
          </div>

          <!-- Swap Button -->
          <div class="swap-container">
            <Button 
              @click="swapUnits" 
              class="swap-button"
              icon="pi pi-arrow-right-arrow-left"
              severity="primary"
              rounded
              :title="translate('swapUnits')"
              aria-label="Swap conversion units"
            />
          </div>

          <!-- To Unit Section -->
          <div class="conversion-section">
            <div class="section-header">
              <label class="section-label">{{ translate('to') }}</label>
            </div>
            
            <Select
              v-model="toUnit"
              :options="unitOptions"
              optionLabel="label"
              optionValue="value"
              class="unit-select"
              :placeholder="translate('to')"
            />
            
            <div class="input-wrapper">
              <InputNumber
                v-model="toValueNumber"
                @input="onToValueChange"
                class="unit-input result-input"
                :placeholder="translate('result')"
                :min="selectedCategory === 'temperature' ? undefined : 0"
                :maxFractionDigits="6"
                :useGrouping="false"
                fluid
                readonly
              />
              <span class="input-unit-label">{{ currentCategory.units[toUnit] }}</span>
            </div>
          </div>
        </div>

        <!-- Conversion Info -->
        <div class="conversion-info" v-if="fromValueNumber && toValueNumber && fromValueNumber !== 0">
          <Card class="info-card">
            <template #content>
              <div class="conversion-rate">
                <i class="pi pi-info-circle rate-icon"></i>
                <span class="rate-text">
                  1 {{ currentCategory.units[fromUnit] }} = {{ getConversionRate() }} {{ currentCategory.units[toUnit] }}
                </span>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </template>
  </Card>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

export default {
  name: 'UnitConverter',
  computed: {
    ...mapState(['fromUnit', 'toUnit', 'fromValue', 'toValue', 'selectedCategory']),
    ...mapGetters(['currentCategory', 'convert', 'translate', 'translateUnitName']),
    
    unitOptions() {
      if (!this.currentCategory) return []
      return Object.keys(this.currentCategory.units).map(unit => ({
        label: `${this.translateUnitName(unit)} (${this.currentCategory.units[unit]})`,
        value: unit
      }))
    },
    
    fromValueNumber: {
      get() {
        return this.fromValue === '' ? null : parseFloat(this.fromValue)
      },
      set(value) {
        this.$store.commit('SET_FROM_VALUE', value === null ? '' : value.toString())
      }
    },
    
    toValueNumber: {
      get() {
        return this.toValue === '' ? null : parseFloat(this.toValue)
      },
      set(value) {
        this.$store.commit('SET_TO_VALUE', value === null ? '' : value.toString())
      }
    }
  },
  
  methods: {
    ...mapMutations(['SET_FROM_UNIT', 'SET_TO_UNIT']),
    ...mapActions(['convertFromTo', 'convertToFrom', 'swapUnits']),
    
    onFromValueChange(event) {
      const value = event.value
      this.convertFromTo(value === null ? '' : value.toString())
    },
    
    onToValueChange(event) {
      const value = event.value
      this.convertToFrom(value === null ? '' : value.toString())
    },
    
    getConversionRate() {
      const result = this.convert(1, this.fromUnit, this.toUnit, this.selectedCategory)
      return Number(result).toLocaleString(undefined, { 
        maximumFractionDigits: 6,
        minimumFractionDigits: 0
      })
    },
    
    getTranslatedCategoryName(key) {
      return this.translate(`categories.${key}.name`)
    },
    
    getTranslatedCategoryDescription(key) {
      return this.translate(`categories.${key}.description`)
    }
  },
  
  watch: {
    fromUnit() {
      if (this.fromValueNumber) {
        this.convertFromTo(this.fromValueNumber.toString())
      }
    },
    
    toUnit() {
      if (this.fromValueNumber) {
        this.convertFromTo(this.fromValueNumber.toString())
      }
    }
  }
}
</script>

<style scoped>
.unit-converter-card {
  background: #ffffff !important;
  backdrop-filter: none;
  border: 1px solid #e2e8f0 !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08) !important;
}

.dark .unit-converter-card {
  background: #1e293b !important;
  border: 1px solid #334155 !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4) !important;
}

.converter-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 8px;
}

.header-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  flex-shrink: 0;
}

.header-content {
  flex: 1;
}

.converter-title {
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 4px 0;
  letter-spacing: -0.3px;
}

.dark .converter-title {
  color: #f9fafb;
}

.converter-description {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
  font-weight: 500;
}

.dark .converter-description {
  color: #9ca3af;
}

.converter-body {
  margin-top: 24px;
}

.conversion-grid {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: 32px;
  align-items: start;
  margin-bottom: 32px;
}

.conversion-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.section-header {
  text-align: center;
}

.section-label {
  font-weight: 700;
  color: #374151;
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.dark .section-label {
  color: #d1d5db;
}

.unit-select {
  width: 100% !important;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.unit-input {
  width: 100% !important;
}

.result-input {
  background: #f8fafc !important;
}

.dark .result-input {
  background: #334155 !important;
}

.input-unit-label {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  font-weight: 600;
  color: #6b7280;
  pointer-events: none;
  background: rgba(255, 255, 255, 0.9);
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
  z-index: 10;
}

.dark .input-unit-label {
  color: #9ca3af;
  background: rgba(31, 41, 55, 0.9);
  border-color: #4b5563;
}

.swap-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
}

.swap-button {
  width: 56px !important;
  height: 56px !important;
  border-radius: 50% !important;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3) !important;
  transition: all 0.3s ease !important;
  background: #3b82f6 !important;
  border: none !important;
}

.swap-button:hover {
  transform: scale(1.1) !important;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.4) !important;
  background: #2563eb !important;
}

.dark .swap-button {
  background: #60a5fa !important;
  box-shadow: 0 4px 12px rgba(96, 165, 250, 0.3) !important;
}

.dark .swap-button:hover {
  background: #3b82f6 !important;
  box-shadow: 0 8px 20px rgba(96, 165, 250, 0.4) !important;
}

/* Ensure icon is visible */
:deep(.swap-button .p-button-icon) {
  color: white !important;
  font-size: 18px !important;
  font-weight: bold !important;
}

.conversion-info {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding-top: 24px;
}

.dark .conversion-info {
  border-top-color: rgba(255, 255, 255, 0.1);
}

.info-card {
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb) !important;
  border: 1px solid rgba(0, 0, 0, 0.05) !important;
}

.dark .info-card {
  background: linear-gradient(135deg, #374151, #4b5563) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
}

.conversion-rate {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.rate-icon {
  font-size: 18px;
  color: #3b82f6;
}

.rate-text {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  text-align: center;
}

.dark .rate-text {
  color: #d1d5db;
}

/* Enhanced PrimeVue InputNumber styling */
:deep(.p-inputnumber) {
  width: 100%;
}

:deep(.p-inputnumber-input) {
  width: 100% !important;
  padding: 16px 20px !important;
  padding-right: 70px !important;
  font-size: 18px !important;
  font-weight: 600 !important;
  border: 2px solid #e5e7eb !important;
  border-radius: 12px !important;
  background: #ffffff !important;
  color: #1f2937 !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05) !important;
}

:deep(.p-inputnumber-input:focus) {
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
  outline: none !important;
}

:deep(.p-inputnumber-input:hover) {
  border-color: #9ca3af !important;
}

:deep(.p-inputnumber-input::placeholder) {
  color: #9ca3af !important;
  font-weight: 500 !important;
}

/* Dark mode InputNumber styling */
.dark :deep(.p-inputnumber-input) {
  background: #374151 !important;
  border-color: #4b5563 !important;
  color: #f9fafb !important;
}

.dark :deep(.p-inputnumber-input:focus) {
  border-color: #60a5fa !important;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1) !important;
}

.dark :deep(.p-inputnumber-input:hover) {
  border-color: #6b7280 !important;
}

.dark :deep(.p-inputnumber-input::placeholder) {
  color: #9ca3af !important;
}

/* Enhanced PrimeVue Select styling */
:deep(.p-select) {
  width: 100% !important;
  border: 2px solid #e5e7eb !important;
  border-radius: 12px !important;
  background: #ffffff !important;
  transition: all 0.3s ease !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05) !important;
}

:deep(.p-select:not(.p-disabled):hover) {
  border-color: #9ca3af !important;
}

:deep(.p-select:not(.p-disabled).p-focus) {
  border-color: #3b82f6 !important;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1) !important;
}

:deep(.p-select .p-select-label) {
  padding: 12px 16px !important;
  font-size: 16px !important;
  font-weight: 500 !important;
  color: #374151 !important;
}

.dark :deep(.p-select) {
  background: #374151 !important;
  border-color: #4b5563 !important;
}

.dark :deep(.p-select:not(.p-disabled):hover) {
  border-color: #6b7280 !important;
}

.dark :deep(.p-select:not(.p-disabled).p-focus) {
  border-color: #60a5fa !important;
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.1) !important;
}

.dark :deep(.p-select .p-select-label) {
  color: #f9fafb !important;
}

/* Responsive design */
@media (max-width: 768px) {
  .converter-header {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
  
  .header-icon {
    width: 48px;
    height: 48px;
    font-size: 20px;
  }
  
  .converter-title {
    font-size: 20px;
  }
  
  .converter-description {
    font-size: 15px;
  }
  
  .conversion-grid {
    grid-template-columns: 1fr;
    gap: 24px;
  }
  
  .swap-container {
    order: 3;
    padding-top: 0;
  }
  
  .swap-button {
    width: 48px !important;
    height: 48px !important;
  }
  
  .section-label {
    font-size: 14px;
  }
  
  .input-unit-label {
    right: 12px;
    font-size: 13px;
  }
  
  :deep(.p-inputnumber-input) {
    padding: 14px 16px !important;
    padding-right: 60px !important;
    font-size: 16px !important;
  }
  
  :deep(.p-select .p-select-label) {
    padding: 10px 14px !important;
    font-size: 15px !important;
  }
}

@media (max-width: 480px) {
  .converter-header {
    gap: 8px;
  }
  
  .header-icon {
    width: 44px;
    height: 44px;
    font-size: 18px;
  }
  
  .converter-title {
    font-size: 18px;
  }
  
  .converter-description {
    font-size: 14px;
  }
  
  .conversion-grid {
    gap: 20px;
  }
  
  .swap-button {
    width: 44px !important;
    height: 44px !important;
  }
  
  .section-label {
    font-size: 13px;
  }
  
  .rate-text {
    font-size: 14px;
  }
  
  :deep(.p-inputnumber-input) {
    padding: 12px 14px !important;
    padding-right: 55px !important;
    font-size: 16px !important;
  }
  
  :deep(.p-select .p-select-label) {
    padding: 8px 12px !important;
    font-size: 14px !important;
  }
}
</style> 