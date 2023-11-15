<script setup lang="ts">
  defineProps<{
    modelValue: string;
    placeholder: string;
  }>();

  const emit = defineEmits<{
    (event: 'update:modelValue', payload: string): void;
  }>();
</script>

<template>
  <div class="search-bar">
    <input
      :value="modelValue"
      type="text"
      :placeholder="placeholder"
      class="search-bar__input"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
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
