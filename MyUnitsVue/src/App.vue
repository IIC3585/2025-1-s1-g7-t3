<script>
import CategorySelector from './components/CategorySelector.vue'
import UnitConverter from './components/UnitConverter.vue'
import ScaleVisualization from './components/ScaleVisualization.vue'
import ThemeToggle from './components/ui/ThemeToggle.vue'
import LanguageSelector from './components/ui/LanguageSelector.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    CategorySelector,
    UnitConverter,
    ScaleVisualization,
    ThemeToggle,
    LanguageSelector
  },
  computed: {
    ...mapGetters(['translate'])
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

    <!-- App Title -->
    <div class="app-title-section">
      <h1 class="app-title">{{ translate('appTitle') }}</h1>
      <p class="app-tagline">{{ translate('appTagline') }}</p>
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

.app-title-section {
  text-align: center;
  padding: 80px 20px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
  overflow: hidden;
  border-radius: 0 0 32px 32px;
}

.app-title-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
  pointer-events: none;
}

.app-title {
  font-size: 3.5rem;
  font-weight: 800;
  margin: 0 0 16px 0;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  position: relative;
  z-index: 1;
}

.app-tagline {
  font-size: 1.25rem;
  font-weight: 400;
  margin: 0;
  opacity: 0.9;
  position: relative;
  z-index: 1;
}

.dark .app-title-section {
  background: linear-gradient(135deg, #be185d 0%, #ec4899 100%);
}

.app-main {
  flex: 1;
  padding: 20px 20px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: calc(100vh - 60px);
}

.main-container {
  width: 100%;
  max-width: 1600px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto auto;
  gap: 32px;
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
  
  .app-title-section {
    padding: 70px 16px 30px;
  }
  
  .app-title {
    font-size: 2.5rem;
  }
  
  .app-tagline {
    font-size: 1.1rem;
  }
  
  .app-main {
    padding: 16px;
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
  
  .app-title-section {
    padding: 60px 12px 24px;
  }
  
  .app-title {
    font-size: 2rem;
  }
  
  .app-tagline {
    font-size: 1rem;
  }
  
  .app-main {
    padding: 12px;
  }
  
  .main-container {
    gap: 16px;
  }
}

/* PrimeVue theme customizations */
.p-card {
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2) !important;
  border: none !important;
  border-radius: 16px !important;
  padding: 20px !important;
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

