<script setup lang="ts">
  import { computed, watch, onMounted } from 'vue';
  import type { User } from './../types/User.ts';
  import { storeToRefs } from 'pinia';
  import { useUsersStore } from '../store/users';

  import UserListItem from '../components/UserListItem.vue';
  import SearchBar from '../components/SearchBar.vue';
  import AppButton from '../components/AppButton.vue';
  import UserPagination from '../components/UserPagination.vue';

  const usersStore = useUsersStore();

  const { users, filteredUsers, currentUsers, searchText, currentPage } =
    storeToRefs(usersStore);

  type JSONResponse = {
    data?: User[];
    page: number;
    per_page: number;
    support?: {
      url?: string;
      text?: string;
    };
    total: number;
    total_pages: number;
  };

  const totalUsersPages = computed(() => Math.ceil(users.value.length / 6));
  const filteredUsersTotalPages = computed(() =>
    Math.ceil(filteredUsers.value.length / 6)
  );

  async function fetchUsers(pageNumber = 1): Promise<JSONResponse> {
    const response = await window.fetch(
      `https://reqres.in/api/users?page=${pageNumber}`,
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
      }
    );

    const responseData: JSONResponse = await response.json();
    if (response.ok) {
      const usersData = responseData?.data;
      if (usersData) {
        return responseData;
      } else {
        return Promise.reject(new Error(`Error when fetching users`));
      }
    } else {
      return Promise.reject(new Error(`Error when fetching users`));
    }
  }

  watch(searchText, () => {
    currentPage.value = 1;
  });

  onMounted(async () => {
    // Fetch the initial page to get the total number of pages.
    const initialResponse = await fetchUsers();
    users.value = initialResponse.data || [];

    const totalPages = initialResponse.total_pages;

    // Fetch all pages upfront. This is done because:
    // 1. The total amount of data is small (only 12 users), so it won't lead to a long initial load time or high memory usage.
    // 2. The API doesn't provide a search endpoint, so we need all data on the client side to implement search functionality.
    // 3. The data on the server doesn't change frequently, so we don't have to worry about data freshness.

    for (let i = 2; i <= totalPages; i++) {
      const additionalResponse = await fetchUsers(i);
      users.value = [...users.value, ...(additionalResponse.data || [])];
    }
  });
</script>

<template>
  <main class="user-list">
    <h1 class="user-list__title">User list</h1>
    <section class="user-list__section">
      <header class="user-list__header">
        <SearchBar
          v-model="searchText"
          placeholder="Search for users..."
          class="user-list__search-bar"
        />
        <AppButton class="user-list__add-btn" rounded>
          <i class="icon icon--medium icon--white plus"></i>
          <span>Add User</span>
        </AppButton>
      </header>
      <table v-if="currentUsers.length" class="user-table">
        <thead class="user-table__head">
          <tr class="user-table__row">
            <th class="user-table__header-cell"></th>
            <th class="user-table__header-cell">Full Name</th>
            <th class="user-table__header-cell">Action</th>
          </tr>
        </thead>
        <tbody class="user-table__body">
          <UserListItem
            v-for="user in currentUsers"
            :key="user.id"
            :user="user"
            class="user-table__row"
          />
        </tbody>
      </table>
      <div v-else>No matching users were found. Please try again.</div>
      <UserPagination
        :total-pages="searchText ? filteredUsersTotalPages : totalUsersPages"
        class="user-list__pagination"
      />
    </section>
  </main>
</template>

<style scoped lang="scss">
  @import '../assets/scss/_mixins.scss';
  @import '../assets/scss/_variables.scss';

  .user-list {
    @include flex-column;
    background-color: $bg;
    font-family: $family-normal;
    color: $black;
    padding: 20px;
    justify-content: center;
    width: 100%;
    max-width: 1240px;
    height: 100%;
    min-height: 100vh;
    margin: 0 auto;

    &__title {
      font-size: 2em;
      font-weight: 400;
      margin-bottom: 6px;
    }

    &__section {
      @include flex;
      flex-direction: column;
      background-color: $gray-0;
      border-radius: 10px;
      margin-top: 20px;
      width: 100%;
      box-shadow: $gray-shadow;
    }

    &__header {
      @include flex;
      justify-content: space-between;
      flex-direction: column;
      border-radius: 10px;
      width: 100%;
      padding: 10px;
      padding-bottom: 0;

      @media screen and (min-width: $md) {
        flex-direction: row;
        padding: 20px;
      }
    }

    &__add-btn {
      max-width: 130px;
      align-self: flex-end;
      margin: 16px 0;

      @media screen and (min-width: $md) {
        flex-direction: row;
      }
    }

    .user-table {
      @include flex;
      flex-direction: column;
      width: 100%;
      padding: 10px;

      &__body,
      &__head {
        width: 100%;
        text-align: left;
      }

      &__head {
        margin-bottom: 12px;
      }

      &__row {
        width: 100%;
        display: grid;
        grid-template-columns: 60px auto 60px;
        grid-template-rows: 1fr;
        font-size: 14px;

        @media screen and (min-width: $md) {
          grid-template-columns: 140px auto 120px;
          font-size: 16px;
        }
      }

      @media screen and (min-width: $md) {
        padding: 20px;
      }
    }

    &__pagination {
      align-self: flex-start;
    }
  }
</style>
