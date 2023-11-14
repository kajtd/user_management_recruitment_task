import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../views/UserList.vue'),
    },
    {
      path: '/user-add',
      component: () => import('../views/UserAdd.vue'),
    },
    {
      path: '/user-edit',
      component: () => import('../views/UserEdit.vue'),
    },
  ],
})
