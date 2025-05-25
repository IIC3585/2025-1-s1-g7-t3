<template>
  <Card class="category-selector-card">
    <template #title>
      <div class="section-header">
        <h2 class="section-title">{{ translate('selectCategory') }}</h2>
        <p class="section-description">{{ translate('categoryDescription') }}</p>
      </div>
    </template>
    
    <template #content>
      <div class="categories-grid">
        <Button
          v-for="(category, key) in categories"
          :key="key"
          @click="selectCategory(key)"
          :class="['category-button', { 'category-button--active': selectedCategory === key }]"
          :severity="selectedCategory === key ? 'primary' : 'secondary'"
          :outlined="selectedCategory !== key"
          size="large"
        >
          <div class="category-content">
            <div class="category-icon">{{ category.icon }}</div>
            <div class="category-info">
              <span class="category-name">{{ getTranslatedCategoryName(key) }}</span>
              <span class="category-units">{{ getUnitCount(category.units) }} {{ translate('units') }}</span>
            </div>
            <i v-if="selectedCategory === key" class="pi pi-check category-check"></i>
          </div>
        </Button>
      </div>
    </template>
  </Card>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'

export default {
  name: 'CategorySelector',
  computed: {
    ...mapState(['categories', 'selectedCategory']),
    ...mapGetters(['translate'])
  },
  methods: {
    ...mapMutations(['SET_CATEGORY']),
    selectCategory(category) {
      this.SET_CATEGORY(category)
    },
    getUnitCount(units) {
      return Object.keys(units).length
    },
    getTranslatedCategoryName(key) {
      return this.translate(`categories.${key}.name`)
    }
  }
}
</script>

<style scoped>
.category-selector-card {
  background: #ffffff !important;
  backdrop-filter: none;
  border: 1px solid #e2e8f0 !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08) !important;
}

.dark .category-selector-card {
  background: #1e293b !important;
  border: 1px solid #334155 !important;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4) !important;
}

.section-header {
  text-align: center;
  margin-bottom: 8px;
}

.section-title {
  font-size: 28px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 8px 0;
  letter-spacing: -0.5px;
}

.dark .section-title {
  color: #f9fafb;
}

.section-description {
  font-size: 16px;
  color: #6b7280;
  margin: 0;
  font-weight: 500;
}

.dark .section-description {
  color: #9ca3af;
}

.categories-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 16px;
  margin-top: 24px;
}

.category-button {
  height: auto !important;
  padding: 0 !important;
  border-radius: 16px !important;
  transition: all 0.3s ease !important;
  position: relative;
  overflow: hidden;
  border: 2px solid transparent !important;
  background: rgba(255, 255, 255, 0.8) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
}

.category-button:hover {
  transform: translateY(-4px) !important;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15) !important;
  border-color: rgba(59, 130, 246, 0.3) !important;
}

.category-button--active {
  transform: translateY(-2px) !important;
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3) !important;
  background: linear-gradient(135deg, #3b82f6, #1d4ed8) !important;
  border-color: #3b82f6 !important;
}

.dark .category-button {
  background: rgba(55, 65, 81, 0.8) !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2) !important;
}

.dark .category-button:hover {
  border-color: rgba(96, 165, 250, 0.3) !important;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.3) !important;
}

.dark .category-button--active {
  background: linear-gradient(135deg, #60a5fa, #3b82f6) !important;
  border-color: #60a5fa !important;
}

.category-content {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  width: 100%;
  text-align: left;
  position: relative;
}

.category-icon {
  font-size: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
  border-radius: 16px;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.category-button--active .category-icon {
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 4px 12px rgba(255, 255, 255, 0.2);
}

.dark .category-icon {
  background: linear-gradient(135deg, #4b5563, #374151);
}

.dark .category-button--active .category-icon {
  background: rgba(255, 255, 255, 0.15);
}

.category-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.category-name {
  font-size: 18px;
  font-weight: 700;
  color: #1f2937;
  letter-spacing: -0.3px;
  line-height: 1.2;
  transition: color 0.3s ease;
}

.category-button--active .category-name {
  color: #ffffff;
}

.dark .category-name {
  color: #f9fafb;
}

.dark .category-button--active .category-name {
  color: #ffffff;
}

.category-units {
  font-size: 14px;
  color: #6b7280;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: color 0.3s ease;
}

.category-button--active .category-units {
  color: rgba(255, 255, 255, 0.8);
}

.dark .category-units {
  color: #9ca3af;
}

.category-check {
  font-size: 20px;
  color: #ffffff;
  flex-shrink: 0;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.3s ease;
}

.category-button--active .category-check {
  opacity: 1;
  transform: scale(1);
}

/* Responsive design */
@media (max-width: 768px) {
  .section-title {
    font-size: 24px;
  }
  
  .section-description {
    font-size: 15px;
  }
  
  .categories-grid {
    grid-template-columns: 1fr;
    gap: 12px;
  }
  
  .category-content {
    padding: 16px;
    gap: 12px;
  }
  
  .category-icon {
    width: 48px;
    height: 48px;
    font-size: 24px;
  }
  
  .category-name {
    font-size: 16px;
  }
  
  .category-units {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 22px;
  }
  
  .section-description {
    font-size: 14px;
  }
  
  .category-content {
    padding: 14px;
    gap: 10px;
  }
  
  .category-icon {
    width: 44px;
    height: 44px;
    font-size: 22px;
  }
  
  .category-name {
    font-size: 15px;
  }
  
  .category-units {
    font-size: 12px;
  }
}
</style> 