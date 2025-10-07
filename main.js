import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import analyticsService from '@/services/analytics.service';

import { IonicVue } from '@ionic/vue';

// Imports de estilos de Ionic
import '@ionic/vue/css/core.css';

// ...

const app = createApp(App)
  .use(IonicVue)
  .use(router);

router.isReady().then(() => {
  app.mount('#app');
  
  // Inicializar Firebase Analytics
  analyticsService.initialize();
});
