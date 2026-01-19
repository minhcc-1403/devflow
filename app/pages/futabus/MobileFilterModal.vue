<script setup lang="ts">
defineProps({ modelValue: Boolean });
defineEmits(["update:modelValue"]);
</script>

<template>
  <transition name="slide-up">
    <div
      v-if="modelValue"
      class="fixed inset-0 z-[100] bg-black/40"
      @click.self="$emit('update:modelValue', false)"
    >
      <div class="absolute bottom-0 w-full rounded-t-2xl bg-white p-5">
        <div class="mb-4 flex justify-between">
          <p class="font-semibold">Bộ lọc</p>
          <button @click="$emit('update:modelValue', false)">✕</button>
        </div>

        <FilterSidebar />
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.25s ease;
}
.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(100%);
}
</style>
