<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  image: string;
}>();
</script>

<template>
  <section class="mx-auto -mt-14 max-w-7xl px-4">
    <div class="overflow-hidden rounded-2xl shadow-lg">
      <img :src="image" :alt="title" class="h-auto w-full object-cover" >
    </div>
  </section>
</template>
