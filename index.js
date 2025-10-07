import { createRouter, createWebHistory } from '@ionic/vue-router';
import analyticsService from '@/services/analytics.service';

// Las rutas aquí
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/HomePage.vue')
  },
  // ... resto de rutas
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

// Tracking automático de Screen Views
router.afterEach((to) => {
  // Obtener el nombre de la pantalla
  const screenName = to.name || to.path.replace('/', '') || 'unknown';
  
  // Trackear la vista de pantalla
  analyticsService.logScreenView(screenName, to.path);
});

export default router;
