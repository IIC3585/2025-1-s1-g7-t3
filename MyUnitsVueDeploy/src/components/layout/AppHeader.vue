<template>
  <header class="app-header">
    <div class="header-content">
      <!-- Left side controls -->
      <div class="header-controls">
        <ThemeToggle />
        <LanguageSelector />
      </div>
      
      <!-- Center logo -->
      <div class="logo-section">
        <div class="logo-icon">⚖️</div>
        <div class="logo-text">
          <h1 class="app-title">{{ translate('appTitle') }}</h1>
          <p class="app-tagline">{{ translate('appTagline') }}</p>
        </div>
      </div>
      
      <!-- Right side info -->
      <div class="header-info">
        <span class="version">v1.0</span>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from 'vuex'
import ThemeToggle from '../ui/ThemeToggle.vue'
import LanguageSelector from '../ui/LanguageSelector.vue'

export default {
  name: 'AppHeader',
  components: {
    ThemeToggle,
    LanguageSelector
  },
  computed: {
    ...mapGetters(['translate'])
  }
}
</script>

<style scoped>
.app-header {
  background: var(--white);
  border-bottom: 1px solid var(--gray-200);
  box-shadow: var(--shadow-sm);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.header-content {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-md);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  gap: var(--spacing-md);
  min-height: 60px;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  justify-self: start;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  justify-self: center;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, var(--primary-color), var(--primary-light));
  border-radius: var(--border-radius);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  box-shadow: var(--shadow-sm);
  flex-shrink: 0;
}

.logo-text {
  display: flex;
  flex-direction: column;
  text-align: center;
}

.app-title {
  font-size: 20px;
  font-weight: 700;
  color: var(--gray-900);
  letter-spacing: -0.3px;
  margin: 0;
  line-height: 1.2;
}

.app-tagline {
  font-size: 12px;
  color: var(--gray-600);
  font-weight: 500;
  margin: 0;
  line-height: 1.3;
}

.header-info {
  display: flex;
  align-items: center;
  justify-self: end;
}

.version {
  background: var(--gray-200);
  color: var(--gray-700);
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Dark mode styles */
:global(.dark) .app-header {
  background: rgba(28, 28, 30, 0.95);
  border-bottom-color: var(--gray-300);
}

:global(.dark) .app-title {
  color: var(--gray-900);
}

:global(.dark) .app-tagline {
  color: var(--gray-600);
}

:global(.dark) .version {
  background: var(--gray-300);
  color: var(--gray-700);
}

/* Responsive design */
@media (max-width: 768px) {
  .header-content {
    padding: var(--spacing-sm);
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
    text-align: center;
    min-height: auto;
  }
  
  .header-controls {
    justify-self: center;
    order: 3;
  }
  
  .logo-section {
    justify-self: center;
    order: 1;
  }
  
  .header-info {
    justify-self: center;
    order: 2;
  }
  
  .app-title {
    font-size: 18px;
  }
  
  .app-tagline {
    font-size: 11px;
  }
}

@media (max-width: 480px) {
  .header-content {
    padding: var(--spacing-xs);
  }
  
  .logo-icon {
    width: 36px;
    height: 36px;
    font-size: 1.1rem;
  }
  
  .app-title {
    font-size: 16px;
  }
  
  .app-tagline {
    font-size: 10px;
  }
  
  .header-controls {
    gap: var(--spacing-xs);
  }
}

/* Hover effects - subtle for native feel */
.logo-section:hover .logo-icon {
  transform: scale(1.02);
}

.logo-section:hover .app-title {
  color: var(--primary-color);
}

:global(.dark) .logo-section:hover .app-title {
  color: var(--primary-light);
}
</style> 