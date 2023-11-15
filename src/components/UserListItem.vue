<script setup lang="ts">
  import type { User } from './../types/User.ts';
  import { storeToRefs } from 'pinia';
  import { useUsersStore } from '../store/users';

  const usersStore = useUsersStore();

  const { users } = storeToRefs(usersStore);

  type Props = {
    user: User;
  };

  defineProps<Props>();

  const editUser = () => {
    // Edit user logic here
  };

  const deleteUser = async (id: number): Promise<void> => {
    const response = await window.fetch(`https://reqres.in/api/users/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
    });

    if (response.ok) {
      // If the deletion was successful, remove the user from the local state
      users.value = users.value.filter((user) => user.id !== id);
    } else {
      console.error(`Error when deleting user with id ${id}`);
      throw new Error(`Error when deleting user with id ${id}`);
    }
  };
</script>

<template>
  <tr class="user-list-item">
    <td>
      <img
        :src="user.avatar"
        :alt="`${user.first_name} ${user.last_name}`"
        class="user-list-item__image"
      />
    </td>
    <td class="user-list-item__name">
      {{ `${user.first_name} ${user.last_name}` }}
    </td>
    <td class="user-list-item__actions">
      <button @click="editUser" class="user-list-item__btn">
        <i class="icon icon--small icon--gray edit"></i>
      </button>
      <button @click="deleteUser(user.id)" class="user-list-item__btn">
        <i class="icon icon--small icon--gray trash"></i>
      </button>
    </td>
  </tr>
</template>

<style scoped lang="scss">
  @import '../assets/scss/_mixins.scss';
  @import '../assets/scss/_variables.scss';

  .user-list-item {
    @include flex;
    height: 64px;
    border-radius: 8px;

    &:nth-child(odd) {
      background-color: $gray-2;
    }

    &__image {
      border-radius: 50%;
      width: 36px;
      height: 36px;
      margin-left: 6px;
      object-fit: cover;

      @media screen and (min-width: $md) {
        margin-left: 12px;
      }
    }

    &__actions {
      display: flex;
      gap: 8px;
    }

    &__btn {
      background: none;
      border: none;
      cursor: pointer;
    }
  }
</style>
