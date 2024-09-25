import { createApp } from "vue";
import { createPinia } from 'pinia';
import App from "./App.vue";
import "./styles/style.css";
import router from './router';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
import '@fortawesome/fontawesome-free/css/all.css';

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
const app = createApp(App);
app.use(router);
app.use(pinia);
app.mount('#app');