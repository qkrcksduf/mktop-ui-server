import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      component: () => import('@/views/LoginPage'),
    },
    {
      path: '/admin/main',
      component: () => import('@/views/admin/MainPage'),
      meta: { auth: true },
    },
    {
      path: '/admin/company-add',
      component: () => import('@/views/admin/CompanyAddPage'),
      meta: { auth: true },
    },
    {
      path: '/admin/company-update',
      component: () => import('@/views/admin/CompanyUpdatePage'),
      meta: { auth: true },
    },
    {
      path: '/admin/company-update/:id',
      component: () => import('@/views/admin/CompanyUpdatePage'),
      meta: { auth: true },
    },
    {
      path: '/manager/main',
      component: () => import('@/views/manager/common/MainPage'),
    },
    {
      path: '/manager/company',
      component: () => import('@/views/manager/company/UpdatePage'),
    },
    {
      path: '/manager/branch',
      component: () => import('@/views/manager/branch/MainPage'),
    },
    {
      path: '/manager/branch-add',
      component: () => import('@/views/manager/branch/AddPage'),
    },
    {
      path: '/manager/branch-update/:id',
      component: () => import('@/views/manager/branch/UpdatePage'),
    },
    {
      path: '/manager/account/info-update',
      component: () => import('@/views/manager/account/InfoPage'),
    },
    {
      path: '/manager/account/password-update',
      component: () => import('@/views/manager/account/PasswordPage'),
    },
    {
      path: '/test',
      component: () => import('@/components/test/LayOuyTestComponent'),
    },
    {
      path: '/*',
      component: () => import('@/views/error/NotFoundPage'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.meta.auth && !store.getters.isLogin) {
    console.log('인증이 필요합니다.');
    next('/login');
    return;
  }
  next();
});

export { router };
