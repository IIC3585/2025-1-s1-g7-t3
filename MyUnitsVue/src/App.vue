<script setup lang="ts">
import UnitConverter from './components/UnitConverter.vue';
</script>

<template>
  <div class="app-container">
    <header>
      <h1>MyUnits</h1>
    </header>
    <main>
      <UnitConverter />
    </main>
    <footer>
      <p>Made with ♥️ and Vue by Grupo 7</p>
    </footer>
  </div>
</template>

<style>
:root {
  --primary-color: #3B82F6;
  --secondary-color: #0EA5E9;
  --background-color: #F8FAFC;
  --card-background: #FFFFFF;
  --text-color: #1E293B;
  --border-color: #E2E8F0;
  --spacing-unit: 8px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.5;
  color: var(--text-color);
  background-color: var(--background-color);
  min-height: 100vh;
}

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: calc(var(--spacing-unit) * 3);
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  text-align: center;
  margin-bottom: calc(var(--spacing-unit) * 4);
}

h1 {
  font-size: 2rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-top: calc(var(--spacing-unit) * 3);
}

main {
  flex: 1;
}

footer {
  margin-top: auto;
  padding: calc(var(--spacing-unit) * 2) 0;
  text-align: center;
  font-size: 0.875rem;
  color: #64748B;
}

@media (max-width: 600px) {
  .app-container {
    padding: calc(var(--spacing-unit) * 2);
  }
  
  h1 {
    font-size: 1.5rem;
  }
}
</style>