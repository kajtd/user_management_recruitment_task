<script setup lang="ts">
  import { ref } from 'vue';
  import type { User } from './../types/User.ts';

  import UserListItem from '../components/UserListItem.vue';
  import SearchBar from '../components/SearchBar.vue';
  import AppButton from '../components/AppButton.vue';

  const users = ref<User[]>([
    {
      id: 1,
      email: 'jon_doe@gmail.com',
      avatar: 'https://picsum.photos/200',
      first_name: 'Jon',
      last_name: 'Doe',
    },
    {
      id: 1,
      email: 'jon_doe@gmail.com',
      avatar: 'https://picsum.photos/200',
      first_name: 'Jon',
      last_name: 'Doe',
    },
    {
      id: 1,
      email: 'jon_doe@gmail.com',
      avatar: 'https://picsum.photos/200',
      first_name: 'Jon',
      last_name: 'Doe',
    },
    {
      id: 1,
      email: 'jon_doe@gmail.com',
      avatar: 'https://picsum.photos/200',
      first_name: 'Jon',
      last_name: 'Doe',
    },
    {
      id: 1,
      email: 'jon_doe@gmail.com',
      avatar: 'https://picsum.photos/200',
      first_name: 'Jon',
      last_name: 'Doe',
    },
    {
      id: 1,
      email: 'jon_doe@gmail.com',
      avatar: 'https://picsum.photos/200',
      first_name: 'Jon',
      last_name: 'Doe',
    },
    {
      id: 1,
      email: 'jon_doe@gmail.com',
      avatar: 'https://picsum.photos/200',
      first_name: 'Jon',
      last_name: 'Doe',
    },
    {
      id: 1,
      email: 'jon_doe@gmail.com',
      avatar: 'https://picsum.photos/200',
      first_name: 'Jon',
      last_name: 'Doe',
    },
  ]);
</script>

<template>
  <main class="user-list">
    <h1 class="user-list__title">User list</h1>
    <section class="user-list__section">
      <header class="user-list__header">
        <SearchBar class="user-list__search-bar" />
        <AppButton class="user-list__add-btn" rounded>
          <i class="icon icon--medium icon--white plus"></i>
          <span>Add User</span>
        </AppButton>
      </header>
      <table class="user-table">
        <thead class="user-table__head">
          <tr class="user-table__row">
            <th class="user-table__header-cell"></th>
            <th class="user-table__header-cell">Full Name</th>
            <th class="user-table__header-cell">Action</th>
          </tr>
        </thead>
        <tbody class="user-table__body">
          <UserListItem
            v-for="user in users"
            :key="user.id"
            :user="user"
            class="user-table__row"
          />
        </tbody>
      </table>
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
  }
</style>
