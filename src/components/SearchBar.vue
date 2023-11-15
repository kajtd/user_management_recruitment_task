<script setup lang="ts">
  import { ref } from 'vue';

  const searchText = ref('');
</script>

<template>
  <div class="search-bar">
    <input
      v-model="searchText"
      type="text"
      placeholder="Search for users..."
      class="search-bar__input"
    />
    <i class="icon icon--small icon--black search search-bar__search"></i>
  </div>
</template>

<style scoped lang="scss">
  @import '../assets/scss/_variables.scss';

  .search-bar {
    width: 100%;
    max-width: 360px;
    height: 36px;
    position: relative;

    &__input {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      border: none;
      height: 100%;
      padding: 12px;
      background: $gray-1;
      border-radius: 5px;
    }

    &__search {
      position: absolute;
      top: 0;
      right: 12px;
      bottom: 0;
      margin: auto;
    }
  }
</style>
