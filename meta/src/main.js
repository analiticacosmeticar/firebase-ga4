import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import analyticsService from '@/services/analytics.service';
import facebookAnalytics from '@/services/facebook-analytics.service'; // ← Añadir

import { IonicVue } from '@ionic/vue';
import '@ionic/vue/css/core.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router);

router.isReady().then(async () => {
  app.mount('#app');
  
  // Inicializar Firebase Analytics
  analyticsService.initialize();
  
  // Inicializar Facebook Analytics
  await facebookAnalytics.initialize();
  
  // Solicitar permiso de tracking (iOS 14+)
  await facebookAnalytics.requestTrackingPermission();
});
