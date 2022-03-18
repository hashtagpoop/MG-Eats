import { createApp } from 'vue'
import App from './App.vue'
import router from "./router"
import '/src/assets/styles/main.css';
import '/src/assets/styles/responsive.css';

const app = createApp(App)
app.use(router)
app.mount('#app')