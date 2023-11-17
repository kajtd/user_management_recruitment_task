<script setup lang="ts">
  import { storeToRefs } from 'pinia';
  import { useUsersStore } from './store/users';
  import TheLoader from './components/TheLoader.vue';

  const usersStore = useUsersStore();
  const { loading } = storeToRefs(usersStore);
</script>

<template>
  <router-view />
  <TheLoader v-if="loading" />
</template>
