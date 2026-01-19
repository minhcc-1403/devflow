<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  image: string;
}>();
</script>

<template>
  <section
    class="relative mx-auto -mt-20 hidden max-w-7xl px-4 md:z-50 md:block"
  >
    <div class="overflow-hidden rounded-2xl shadow-lg">
      <img :src="image" :alt="title" class="h-auto w-full object-cover" />
    </div>
  </section>
</template>
