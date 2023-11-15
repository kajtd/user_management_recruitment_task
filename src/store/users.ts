import { ref } from 'vue';
import { defineStore } from 'pinia'
import type { User } from './../types/User.ts';

export const useUsersStore = defineStore('users', () => {

    const users = ref<User[]>([])
    const totalPages = ref(0)
  
    return { 
        users,
        totalPages
    }
  })