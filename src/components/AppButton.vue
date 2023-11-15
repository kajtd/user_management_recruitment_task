<script setup lang="ts">
  defineProps<{
    additionalClass?: string;
    rounded?: boolean;
    type?: 'button' | 'submit' | 'reset';
    href?: string;
    ariaLabel?: string;
  }>();
</script>

<template>
  <router-link
    v-if="href"
    :class="[
      'app-btn',
      additionalClass,
      rounded ? 'app-btn--rounded' : 'primary',
    ]"
    :to="href"
  >
    <slot />
  </router-link>
  <button
    v-else
    :class="[
      'app-btn',
      additionalClass,
      rounded ? 'app-btn--rounded' : 'primary',
    ]"
    :type="type || 'button'"
    :aria-label="ariaLabel"
  >
    <slot />
  </button>
</template>

<style lang="scss" scoped>
  @import '../assets/scss/_variables.scss';
  @import '../assets/scss/_mixins.scss';

  .app-btn {
    @include flex;
    background-color: $accent;
    color: $gray-0;
    border: none;
    cursor: pointer;
    justify-content: center;
    padding: 8px 16px;
    border-radius: 6px;
    width: 100%;
    transition: background 0.3s ease-in;
    font-size: 14px;
    font-family: inherit;
    gap: 12px;

    &:hover {
      background-color: $accent-dark;
    }

    &--rounded {
      border-radius: 99px;
    }
  }
</style>
