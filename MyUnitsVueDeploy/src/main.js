import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import store from './store'

// PrimeVue imports
import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
import 'primeicons/primeicons.css'

// PrimeVue components
import Button from 'primevue/button'
import Card from 'primevue/card'
import Select from 'primevue/select'
import InputNumber from 'primevue/inputnumber'
import ToggleSwitch from 'primevue/toggleswitch'
import Divider from 'primevue/divider'
import Tag from 'primevue/tag'
import Panel from 'primevue/panel'

const app = createApp(App)

app.use(store)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark',
      cssLayer: {
        name: 'primevue',
        order: 'tailwind-base, primevue, tailwind-utilities'
      }
    }
  }
})

// Register PrimeVue components globally
app.component('Button', Button)
app.component('Card', Card)
app.component('Select', Select)
app.component('InputNumber', InputNumber)
app.component('ToggleSwitch', ToggleSwitch)
app.component('Divider', Divider)
app.component('Tag', Tag)
app.component('Panel', Panel)

app.mount('#app')
