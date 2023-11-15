<script setup lang="ts">
  import AppButton from '../components/AppButton.vue';
</script>

<template>
  <main class="user-form">
    <h1 class="user-form__title">Add user</h1>
    <section class="user-form__section">
      <form class="user-form__form">
        <div class="user-form__input-group">
          <label for="first-name" class="user-form__label">First Name</label>
          <input
            type="text"
            id="first-name"
            class="user-form__input"
            placeholder="Semafor"
          />
        </div>
        <div class="user-form__input-group">
          <label for="last-name" class="user-form__label">Last Name</label>
          <input
            type="text"
            id="last-name"
            class="user-form__input"
            placeholder="Krzekobrzegyczynski"
          />
        </div>
        <AppButton type="submit" class="user-form__submit">
          Update Details
        </AppButton>
      </form>
      <div class="user-profile">
        <img
          src="https://reqres.in/img/faces/2-image.jpg"
          alt="User"
          class="user-profile__image"
        />
        <button class="user-profile__change-photo-btn">
          <i class="icon icon--medium icon--gray camera"></i>
          <span>Change Photo</span>
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped lang="scss">
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
      flex-direction: column;
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
      max-width: 136px;

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
      width: 100px;
      height: 100px;
      border-radius: 50%;
      margin-top: auto;
    }

    &__change-photo-btn {
      @include flex;
      justify-content: center;
      gap: 10px;
      width: 100%;
      margin-top: auto;
      border: 1px solid $gray-4;
      color: $gray-4;
      border-radius: 4px;
      padding: 6px 12px;
      background-color: transparent;
      cursor: pointer;
    }
  }
</style>
