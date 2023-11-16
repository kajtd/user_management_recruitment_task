import { ref, computed, watch } from 'vue';
import { defineStore } from 'pinia'
import type { User } from './../types/User.ts';

export const useUsersStore = defineStore('users', () => {
    const users = ref<User[]>([])
    const currentPage = ref(1)
    const usersPerPage = 6
    const searchText = ref('')
    const loading = ref(false)

    const totalPages = computed(() => Math.ceil(filteredUsers.value.length / usersPerPage));

    const filteredUsers = computed<User[]>(() => {
        if (!searchText.value) {
            return users.value;
        }

        const lowerCaseSearchText = searchText.value.toLowerCase();

        return users.value.filter((user: User) => {
            const fullName = `${user.first_name} ${user.last_name}`.toLowerCase();
            return fullName.includes(lowerCaseSearchText);
        });
    });

    const currentUsers = computed(() => {
        const start = (currentPage.value - 1) * usersPerPage;
        const end = start + usersPerPage;
        return filteredUsers.value.slice(start, end);
    });

    watch(users, () => {
        // This effectively moves the view back to the previous page if there are no users on the current page
        if (currentPage.value > 1 && !currentUsers.value.length) {
          currentPage.value--;
        }
      })

    return { 
        users,
        loading,
        currentUsers,
        totalPages,
        currentPage,
        filteredUsers,
        searchText
    }
})