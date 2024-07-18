import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config';
import MyPreset from './assets/presetTemplate';

const app = createApp(App)

app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: MyPreset
    }
});

app.mount('#app')






