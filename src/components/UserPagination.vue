<script setup lang="ts">
  import { useUsersStore } from '../store/users';
  import { storeToRefs } from 'pinia';

  const props = defineProps<{
    totalPages: number;
  }>();

  const usersStore = useUsersStore();
  const { currentPage } = storeToRefs(usersStore);

  const goToPage = (page: number) => {
    currentPage.value = page;
  };

  const goToFirstPage = () => {
    currentPage.value = 1;
  };

  const goToLastPage = () => {
    currentPage.value = props.totalPages;
  };
</script>

<template>
  <div class="pagination">
    <button
      class="pagination__btn"
      @click="goToFirstPage"
      :disabled="currentPage === 1"
    >
      <i
        class="icon icon--extra-small icon--green double-arrow-left"
        :class="{ 'icon--disabled': currentPage === 1 }"
      ></i>
    </button>
    <button
      v-for="page in totalPages"
      :key="page"
      class="pagination__btn"
      :class="{ 'pagination__btn--active': currentPage === page }"
      @click="goToPage(page)"
    >
      {{ page }}
    </button>
    <button
      class="pagination__btn"
      @click="goToLastPage"
      :disabled="currentPage === totalPages"
    >
      <i
        class="icon icon--extra-small icon--green double-arrow-right"
        :class="{ 'icon--disabled': currentPage === totalPages }"
      ></i>
    </button>
  </div>
</template>

<style lang="scss">
  @import '../assets/scss/_variables.scss';
  @import '../assets/scss/_mixins.scss';

  .pagination {
    @include flex;
    margin: 1em;
    box-shadow: $gray-shadow;

    &__btn {
      background-color: white;
      border: none;
      color: $accent;
      cursor: pointer;
      height: 32px;
      width: 32px;
      border: 1px solid $gray-2;
      font-size: 12px;

      &:disabled {
        cursor: not-allowed;
      }

      &--active {
        background-color: $accent;
        color: white;
      }
    }
  }
</style>
