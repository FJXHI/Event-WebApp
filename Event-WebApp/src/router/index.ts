/* index.ts **
** entry point for the router configuration */

import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/programm',
      name: 'Programm',
      component: () => import('../views/ProgrammView.vue'),
    },
    {
      path: '/acts',
      name: 'Acts',
      component: () => import('../views/ActsView.vue'),
    },
    {
      path: '/act/:id',
      name: 'ActDetail',
      component: () => import('../views/ActDetail.vue'),
      props: true, // ID send as prop to the ActDetail component
    },
    {
      path: '/event/:id',
      name: 'EventDetail',
      component: () => import('../views/EventDetail.vue'),
      props: true,
    },
    {
      path: '/location/:id',
      name: 'LocationDetail',
      component: () => import('../views/LocationDetail.vue'),
      props: true,
    },
    {
      path: '/locations',
      name: 'locations',
      component: () => import('../views/LocationsView.vue'),
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/FavoritesView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
  ],
});

export default router;
