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
      path: '/root/main',
      component: () => import('@/views/root/MainPage'),
      meta: { auth: true },
    },
    {
      path: '/root/company-add',
      component: () => import('@/views/root/CompanyAddPage'),
      meta: { auth: true },
    },
    {
      path: '/root/company-update',
      component: () => import('@/views/root/CompanyUpdatePage'),
      meta: { auth: true },
    },
    {
      path: '/root/company-update/:id',
      component: () => import('@/views/root/CompanyUpdatePage'),
      meta: { auth: true },
    },
    {
      path: '/admin/main',
      component: () => import('@/views/admin/common/MainPage'),
      meta: { auth: true },
    },
    {
      path: '/admin/company-update',
      component: () => import('@/views/admin/company/UpdatePage'),
      meta: { auth: true },
    },
    {
      path: '/admin/branch',
      component: () => import('@/views/admin/branch/MainPage'),
      meta: { auth: true },
    },
    {
      path: '/admin/branch-add',
      component: () => import('@/views/admin/branch/AddPage'),
      meta: { auth: true },
    },
    {
      path: '/admin/branch-update/:id',
      component: () => import('@/views/admin/branch/UpdatePage'),
      meta: { auth: true },
    },
    {
      path: '/admin/account/info-update',
      component: () => import('@/views/admin/account/InfoPage'),
      meta: { auth: true },
    },
    {
      path: '/admin/account/password-update',
      component: () => import('@/views/admin/account/PasswordPage'),
      meta: { auth: true },
    },
    {
      path: '/manager/main',
      component: () => import('@/views/manager/MainPage'),
      meta: { auth: true },
    },
    {
      path: '/manager/device',
      component: () => import('@/views/manager/ListPage'),
      meta: { auth: true },
    },
    {
      path: '/manager/device-add',
      component: () => import('@/views/manager/AddPage'),
      meta: { auth: true },
    },
    {
      path: '/manager/device-update/:id',
      component: () => import('@/views/manager/DeviceUpdatePage'),
      meta: { auth: true },
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
