<script>
import CategorySelector from './components/CategorySelector.vue'
import UnitConverter from './components/UnitConverter.vue'
import ScaleVisualization from './components/ScaleVisualization.vue'
import ThemeToggle from './components/ui/ThemeToggle.vue'
import LanguageSelector from './components/ui/LanguageSelector.vue'

export default {
  name: 'App',
  components: {
    CategorySelector,
    UnitConverter,
    ScaleVisualization,
    ThemeToggle,
    LanguageSelector
  }
}
</script>

<template>
  <div id="app">
    <!-- Top Controls -->
    <div class="top-controls">
      <div class="controls-container">
        <ThemeToggle />
        <LanguageSelector />
      </div>
    </div>

    <!-- Main Content -->
    <main class="app-main">
      <div class="main-container">
        <CategorySelector class="categories-section" />
        <UnitConverter class="converter-section" />
        <ScaleVisualization class="visualization-section" />
      </div>
    </main>

    <!-- Footer -->
    <footer class="app-footer">
      <div class="footer-content">
        <span>&copy; 2025 IIC3585 - Diseño Avanzado de Aplicaciones Web.</span>
        <span>Built with Vue.js, Vuex & PrimeVue & Love ♥️ by Grupo 7</span>
      </div>
    </footer>
  </div>
</template>

<style>
/* Reset and base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  /* Custom color palette that works with PrimeVue */
  --app-primary: #3B82F6;
  --app-primary-dark: #2563EB;
  --app-surface: #FFFFFF;
  --app-surface-dark: #1F2937;
  --app-text: #1F2937;
  --app-text-dark: #F9FAFB;
  --app-border: #E5E7EB;
  --app-border-dark: #374151;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  background: var(--app-surface);
  color: var(--app-text);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.dark body {
  background: var(--app-surface-dark);
  color: var(--app-text-dark);
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f8fafc;
}

.dark #app {
  background: #0f172a;
}

.top-controls {
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 1000;
}

.controls-container {
  display: flex;
  gap: 12px;
  align-items: center;
}

.app-main {
  flex: 1;
  padding: 80px 20px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: calc(100vh - 60px);
}

.main-container {
  width: 100%;
  max-width: 1400px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 24px;
  grid-template-areas: 
    "categories converter"
    "categories visualization";
}

.app-footer {
  background: #ffffff;
  backdrop-filter: none;
  border-top: 1px solid #e2e8f0;
  padding: 16px 20px;
}

.dark .app-footer {
  background: #1e293b;
  border-top-color: #334155;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: #64748b;
}

.dark .footer-content {
  color: #94a3b8;
}

/* Grid areas */
.categories-section {
  grid-area: categories;
}

.converter-section {
  grid-area: converter;
}

.visualization-section {
  grid-area: visualization;
}

/* Responsive design */
@media (max-width: 1024px) {
  .main-container {
    grid-template-columns: 1fr;
    grid-template-areas: 
      "categories"
      "converter"
      "visualization";
  }
}

@media (max-width: 768px) {
  .top-controls {
    top: 16px;
    left: 16px;
  }
  
  .app-main {
    padding: 70px 16px 16px;
  }
  
  .main-container {
    gap: 20px;
  }
  
  .footer-content {
    flex-direction: column;
    gap: 8px;
    text-align: center;
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .top-controls {
    top: 12px;
    left: 12px;
  }
  
  .controls-container {
    gap: 8px;
  }
  
  .app-main {
    padding: 60px 12px 12px;
  }
  
  .main-container {
    gap: 16px;
  }
}

/* PrimeVue theme customizations */
.p-card {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1) !important;
  border: none !important;
  border-radius: 16px !important;
}

.dark .p-card {
  background: rgba(31, 41, 55, 0.95) !important;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3) !important;
}

.p-button {
  border-radius: 12px !important;
  font-weight: 600 !important;
  transition: all 0.2s ease !important;
}

.p-button:hover {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
}

.p-select {
  border-radius: 12px !important;
}

.p-inputnumber-input {
  border-radius: 12px !important;
  font-size: 18px !important;
  font-weight: 600 !important;
}

/* Custom animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.main-container > * {
  animation: fadeInUp 0.6s ease-out;
}

.main-container > *:nth-child(2) {
  animation-delay: 0.1s;
}
</style>

