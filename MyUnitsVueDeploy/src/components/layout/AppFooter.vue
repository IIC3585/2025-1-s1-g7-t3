<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-left">
        <span>&copy; 2025 IIC3585 - Diseño Avanzado de Aplicaciones Web.</span>
      </div>
      <div class="footer-right">
        <span>Built with Vue.js & Vuex</span>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter'
}
</script>

<style scoped>
.app-footer {
  background: var(--white);
  border-top: 1px solid var(--gray-200);
  margin-top: auto;
}

.footer-content {
  max-width: 800px;
  margin: 0 auto;
  padding: var(--spacing-md);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.footer-left,
.footer-right {
  font-size: 13px;
  color: var(--gray-600);
}

.footer-right {
  font-weight: 500;
}

/* Dark mode styles */
:global(.dark) .app-footer {
  background: var(--gray-100);
  border-top-color: var(--gray-300);
}

:global(.dark) .footer-left,
:global(.dark) .footer-right {
  color: var(--gray-600);
}

/* Responsive design */
@media (max-width: 768px) {
  .footer-content {
    padding: var(--spacing-sm);
    flex-direction: column;
    gap: var(--spacing-xs);
    text-align: center;
  }
}
</style> 