<script setup lang="ts">
  interface Props {
    id: string;
    label: string;
    modelValue: string;
    type?: string;
    required?: boolean;
    minlength?: number;
    maxlength?: number;
    inputClass?: string;
    labelClass?: string;
  }

  withDefaults(defineProps<Props>(), {
    type: 'text',
  });

  const emit = defineEmits<{
    (event: 'update:modelValue', payload: string): void;
  }>();
</script>

<template>
  <div>
    <label :for="id" :class="labelClass">{{ label }}</label>
    <input
      :class="inputClass"
      :id="id"
      :type="type"
      :value="modelValue"
      :required="required"
      :minlength="minlength"
      :maxlength="maxlength"
      @input="
        emit('update:modelValue', ($event.target as HTMLInputElement).value)
      "
    />
  </div>
</template>
