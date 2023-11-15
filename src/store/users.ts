import { ref, computed } from 'vue';
import { defineStore } from 'pinia'
import type { User } from './../types/User.ts';

export const useUsersStore = defineStore('users', () => {

    const users = ref<User[]>([])
    const totalPages = ref(0)
    const currentPage = ref(1)
    const usersPerPage = 6

    const currentUsers = computed(() => {
        const start = (currentPage.value - 1) * usersPerPage;
        const end = start + usersPerPage;
        return users.value.slice(start, end);
      });
  
    return { 
        users,
        currentUsers,
        totalPages,
        currentPage
    }
  })