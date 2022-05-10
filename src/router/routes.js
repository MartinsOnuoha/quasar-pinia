const routes = [
  {
    path: '/',
    component: () => import('layouts/ExploreLayout.vue'),
    children: [
      {
        path: '',
        name: 'explore',
        component: () => import('pages/ExplorePage.vue'),
      },
      {
        path: '/view-menu/:restaurantId',
        name: 'view-menu',
        props: true,
        component: () => import('pages/ViewMenu.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      { path: '', name: 'auth', component: () => import('pages/Auth.vue') },
    ],
  },
  {
    path: '/app',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuthentication: true },
    children: [
      {
        path: '',
        name: 'dashboard',
        component: () => import('src/pages/Dashboard.vue'),
      },
      {
        path: 'profile',
        name: 'profile',
        component: () => import('pages/ProfilePage.vue'),
      },
      {
        path: 'menu',
        name: 'menu',
        component: () => import('pages/MenuPage.vue'),
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('pages/OrdersPage.vue'),
      },
    ],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
