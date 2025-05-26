<template>
  <div class="theme-toggle-container">
    <ToggleSwitch
      v-model="darkMode"
      @change="toggleTheme"
      class="theme-toggle"
      :pt="{
        slider: { class: 'theme-slider' },
        handle: { class: 'theme-handle' }
      }"
    />
    <span class="theme-label">
      <i :class="darkMode ? 'pi pi-moon' : 'pi pi-sun'"></i>
    </span>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ThemeToggle',
  computed: {
    ...mapState(['darkMode'])
  },
  methods: {
    ...mapActions(['toggleDarkMode']),
    toggleTheme() {
      this.toggleDarkMode()
    }
  }
}
</script>

<style scoped>
.theme-toggle-container {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: #ffffff;
  border-radius: 12px;
  backdrop-filter: none;
  border: 1px solid #e2e8f0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.dark .theme-toggle-container {
  background: #1e293b;
  border-color: #334155;
}

.theme-toggle-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.theme-toggle {
  transform: scale(0.8);
}

.theme-label {
  font-size: 16px;
  color: #374151;
  transition: color 0.3s ease;
}

.dark .theme-label {
  color: #d1d5db;
}

.theme-label i {
  transition: transform 0.3s ease;
}

.theme-toggle-container:hover .theme-label i {
  transform: scale(1.1);
}

/* Custom PrimeVue ToggleSwitch styling */
:deep(.p-toggleswitch) {
  width: 44px;
  height: 24px;
}

:deep(.p-toggleswitch .p-toggleswitch-slider) {
  background: #e5e7eb;
  border-radius: 12px;
  transition: all 0.3s ease;
  width: 44px;
  height: 24px;
}

:deep(.p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider) {
  background: #3b82f6;
}

:deep(.p-toggleswitch .p-toggleswitch-handle) {
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  position: absolute;
  top: 2px;
  left: 2px;
}

:deep(.p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-handle) {
  transform: translateX(20px);
}

/* Dark mode adjustments */
.dark :deep(.p-toggleswitch .p-toggleswitch-slider) {
  background: #4b5563;
}

.dark :deep(.p-toggleswitch.p-toggleswitch-checked .p-toggleswitch-slider) {
  background: #60a5fa;
}

.dark :deep(.p-toggleswitch .p-toggleswitch-handle) {
  background: #f9fafb;
}
</style> 