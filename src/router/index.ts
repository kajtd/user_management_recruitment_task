import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/UserList.vue'),
    },
    {
      path: '/user-form',
      component: () => import('../views/UserForm.vue'),
    },
  ],
})
