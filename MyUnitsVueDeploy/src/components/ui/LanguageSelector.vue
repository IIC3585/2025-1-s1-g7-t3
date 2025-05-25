<template>
  <div class="language-selector-container">
    <Select
      v-model="selectedLanguage"
      :options="languages"
      optionLabel="name"
      optionValue="value"
      @change="onLanguageChange"
      class="language-select"
      :placeholder="currentLanguage.code"
    >
      <template #value="slotProps">
        <div class="language-value" v-if="slotProps.value">
          <span class="language-flag">{{ getLanguageByValue(slotProps.value).flag }}</span>
          <span class="language-code">{{ getLanguageByValue(slotProps.value).code }}</span>
        </div>
        <div class="language-value" v-else>
          <span class="language-flag">{{ currentLanguage.flag }}</span>
          <span class="language-code">{{ currentLanguage.code }}</span>
        </div>
      </template>
      
      <template #option="slotProps">
        <div class="language-option">
          <span class="language-flag">{{ slotProps.option.flag }}</span>
          <span class="language-name">{{ slotProps.option.name }}</span>
        </div>
      </template>
    </Select>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'LanguageSelector',
  data() {
    return {
      languages: [
        { code: 'EN', name: 'English', flag: '🇺🇸', value: 'en' },
        { code: 'ES', name: 'Español', flag: '🇨🇱', value: 'es' }
      ]
    }
  },
  computed: {
    ...mapState(['language']),
    currentLanguage() {
      return this.languages.find(lang => lang.value === this.language) || this.languages[0]
    },
    selectedLanguage: {
      get() {
        return this.language
      },
      set(value) {
        this.setLanguage(value)
      }
    }
  },
  methods: {
    ...mapActions(['setLanguage']),
      onLanguageChange(event) {
      this.setLanguage(event.value)
    },
    getLanguageByValue(value) {
      return this.languages.find(lang => lang.value === value) || this.languages[0]
    }
  }
}
</script>

<style scoped>
.language-selector-container {
  padding: 8px 12px;
  background: #ffffff;
  border-radius: 12px;
  backdrop-filter: none;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.dark .language-selector-container {
  background: #1e293b;
  border-color: #334155;
}

.language-selector-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.language-select {
  min-width: 80px;
}

.language-value,
.language-option {
  display: flex;
  align-items: center;
  gap: 8px;
}

.language-flag {
  font-size: 16px;
}

.language-code {
  font-size: 14px;
  font-weight: 600;
  color: #374151;
}

.dark .language-code {
  color: #d1d5db;
}

.language-name {
  font-size: 14px;
  font-weight: 500;
  color: #374151;
}

.dark .language-name {
  color: #d1d5db;
}

/* Custom PrimeVue Select styling */
:deep(.p-select) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 4px 8px !important;
  min-height: auto !important;
}

:deep(.p-select:not(.p-disabled):hover) {
  border-color: transparent !important;
}

:deep(.p-select:not(.p-disabled).p-focus) {
  outline: none !important;
  border-color: transparent !important;
  box-shadow: none !important;
}

:deep(.p-select .p-select-dropdown) {
  color: #6b7280;
  width: 16px;
  height: 16px;
}

.dark :deep(.p-select .p-select-dropdown) {
  color: #9ca3af;
}

:deep(.p-select-overlay) {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px) !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  border-radius: 12px !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
}

.dark :deep(.p-select-overlay) {
  background: rgba(31, 41, 55, 0.95) !important;
  border-color: rgba(255, 255, 255, 0.1) !important;
}

:deep(.p-select-option) {
  padding: 12px 16px !important;
  border-radius: 8px !important;
  margin: 4px !important;
  transition: all 0.2s ease !important;
}

:deep(.p-select-option:hover) {
  background: rgba(59, 130, 246, 0.1) !important;
}

:deep(.p-select-option.p-selected) {
  background: #3b82f6 !important;
  color: white !important;
}

:deep(.p-select-option.p-selected .language-name) {
  color: white !important;
}
</style> 