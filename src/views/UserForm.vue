<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useUsersStore } from '../store/users';
  import type { User } from '../types/User';
  import { useRouter, useRoute } from 'vue-router';
  import defaultAvatar from '../assets/images/user-icon.png';
  import { API_BASE_URL } from '../config';
  import AppButton from '../components/AppButton.vue';
  import InputGroup from '../components/InputGroup.vue';

  type APIResponse = {
    id: number;
    email?: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };

  const router = useRouter();
  const route = useRoute();

  const usersStore = useUsersStore();

  const firstName = ref('');
  const lastName = ref('');
  const avatar = ref(defaultAvatar);
  const isEditing = computed(() => !!route.params.id);
  const lastAssignedId = computed(() =>
    users.value.reduce((maxId, user) => Math.max(user.id, maxId), 0)
  );

  const { users, loading } = storeToRefs(usersStore);

  const changePhoto = () => {
    const url = window.prompt('Please enter the URL of the new photo');
    if (url) {
      avatar.value = url;
    }
  };

  onMounted(() => {
    const id = Number(route.params.id);
    if (id) {
      const userToEdit = users.value.find((user) => user.id === id);
      if (userToEdit) {
        firstName.value = userToEdit.first_name;
        lastName.value = userToEdit.last_name;
        avatar.value = userToEdit.avatar;
      }
    }
  });

  async function saveUser(user: User): Promise<APIResponse> {
    const method = user.id ? 'PUT' : 'POST';
    const url = user.id
      ? `${API_BASE_URL}/users/${user.id}`
      : '${API_BASE_URL}/users';

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      throw new Error('Error when saving user');
    }

    return response.json();
  }

  const onSubmit = async () => {
    loading.value = true;

    const userToSave: User = {
      id: Number(route.params.id) || lastAssignedId.value + 1,
      avatar: avatar.value,
      first_name: firstName.value,
      last_name: lastName.value,
    };

    try {
      const savedUser = await saveUser(userToSave);

      if (route.params.id) {
        const index = users.value.findIndex(
          (u) => u.id === Number(route.params.id)
        );
        users.value.splice(index, 1, savedUser);
      } else {
        users.value.push(savedUser);
      }
      loading.value = false;
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };
</script>

<template>
  <main class="user-form">
    <h1 class="user-form__title">{{ isEditing ? 'Edit' : 'Add' }} user</h1>
    <section class="user-form__section">
      <form class="user-form__form" @submit.prevent="onSubmit">
        <InputGroup
          v-model="firstName"
          id="first-name"
          label="First Name"
          required
          :minlength="2"
          :maxlength="50"
          class="user-form__input-group"
          input-class="user-form__input"
          label-class="user-form__label"
        />
        <InputGroup
          v-model="lastName"
          id="last-name"
          label="Last Name"
          required
          :minlength="2"
          :maxlength="50"
          class="user-form__input-group"
          input-class="user-form__input"
          label-class="user-form__label"
        />
        <AppButton type="submit" class="user-form__submit">
          Update Details
        </AppButton>
      </form>
      <div class="user-profile">
        <img
          :src="avatar"
          :alt="avatar ? `${firstName} ${lastName}` : 'User icon'"
          class="user-profile__image"
        />
        <button class="user-profile__change-photo-btn" @click="changePhoto">
          <i class="icon icon--small icon--gray camera"></i>
          <span>Change Photo</span>
        </button>
      </div>
    </section>
  </main>
</template>

<style lang="scss">
  @import '../assets/scss/_mixins.scss';
  @import '../assets/scss/_variables.scss';

  .user-form {
    @include flex-column;
    margin: 0 auto;
    width: 100%;
    max-width: 1240px;
    height: 100%;
    min-height: 100vh;

    &__title {
      font-size: 24px;
      font-weight: 400;
      margin-bottom: 20px;
    }

    &__section {
      display: flex;
      align-items: center;
      flex-direction: column-reverse;
      justify-content: space-between;
      gap: 24px;
      width: 100%;

      @media screen and (min-width: $md) {
        flex-direction: row;
      }
    }

    &__form {
      display: flex;
      flex-direction: column;
      background: white;
      box-shadow: $gray-shadow;
      padding: 36px 20px 20px 20px;
      width: 100%;
      height: 300px;

      @media screen and (min-width: $md) {
        flex-direction: row;
        flex-wrap: wrap;
        gap: 0;
      }
    }

    &__input-group {
      flex: 0 1 48%;
      margin-right: 2%;
    }

    &__label {
      display: block;
      margin-bottom: 10px;
      font-weight: 600;
      font-size: 14px;
    }

    &__input {
      width: 100%;
      padding: 10px;
      border: 1px solid $gray-3;
      border-radius: 4px;
    }

    &__submit {
      margin-top: auto;
      max-width: 148px;

      @media screen and (min-width: $md) {
        flex: 0 1 100%;
      }
    }
  }

  .user-profile {
    @include flex-column;
    align-items: center;
    justify-content: space-around;
    gap: 10%;
    background-color: white;
    box-shadow: $gray-shadow;
    padding: 24px;
    height: 300px;
    width: 100%;
    align-self: flex-start;

    @media screen and (min-width: $md) {
      max-width: 240px;
    }

    @media screen and (min-width: $lg) {
      max-width: 420px;
    }

    &__image {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      margin-top: auto;
      border: 3px solid $gray-2;
      padding: 1px;
    }

    &__change-photo-btn {
      @include flex;
      justify-content: center;
      gap: 4px;
      width: 100%;
      margin-top: auto;
      border: 1px solid black;
      font-size: 14px;
      color: $gray-4;
      border-radius: 4px;
      padding: 8px 12px;
      background-color: transparent;
      cursor: pointer;
    }
  }
</style>
