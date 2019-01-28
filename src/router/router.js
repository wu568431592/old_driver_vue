import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
      {
          path: '/',
          name: 'login',
          component: () => import('../pages/login/login.vue')
      },
      {
          path: '/home',
          name: '',
          component: () => import('../pages/home/home.vue'),
          children:[
              {
                  path: '',
                  name: 'index',
                  component: () => import('../pages/home/children/index.vue'),
              },
              {
                  path: 'product_management',
                  name: 'product_management',
                  component: () => import('../pages/home/children/product_management.vue'),
              },
              {
                  path: 'fund_management',
                  name: 'fund_management',
                  component: () => import('../pages/home/children/fund_management.vue'),
              },
              {
                  path: 'hs300_management',
                  name: 'hs300_management',
                  component: () => import('../pages/home/children/hs300_management.vue'),
              }
          ]
      }
  ]
})
