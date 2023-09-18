import { createRouter, createWebHistory } from 'vue-router';

import Signup from '@/components/Login-Signup/Signup.vue';
import Login from '@/components/Login-Signup/Login.vue';
import { isAuthenticated } from '@/auth/auth.js';

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/home',
    name: 'Home',
    component: ()=> import('../layouts/default/Default.vue'),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: 'dashboard', // This represents the default child route
        name: 'Dashboard',
        component: ()=> import('../views/Home.vue'),
      },
      {
        path: 'categories',
        name: 'Categories',
        component: ()=> import('../components/Home-Dashboard/Categories.vue'),
      },
    ],
  },  
  {
    path: '/products', // Use a dynamic route parameter ':id'
    name: 'Product',
    component: () => import('../layouts/default/Default.vue'),
    props: {
      default: true,
    },
    meta: {
          requiresAuth: true,
        },
    children: [
      {
        path: '/details/:id',
        name: 'Details',
        component: () => import('../components/common/ProductDetails.vue'),
      }
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Add a navigation guard to check if the user is authenticated before entering the route
router.beforeEach((to, from, next) => {
  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (isAuthenticated()) {
      // User is authenticated, allow access
      next();
    } else {
      // User is not authenticated, redirect to the login page
      next({ name: 'Login' });
    }
  } else {
    // Allow access to routes that don't require authentication
    next();
  }
});

export default router;
