import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import MyPreset from "./assets/presetTemplate";
import ConfirmationService from "primevue/confirmationservice";
import { createPinia } from "pinia";
import Tooltip from "primevue/tooltip";

const app = createApp(App);
const pinia = createPinia();

app.directive("tooltip", Tooltip);
app.use(pinia);
app.use(router);
app.use(ConfirmationService);
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
  },
});

app.mount("#app");
