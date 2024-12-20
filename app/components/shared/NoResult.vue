<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  link?: string;
  linkTitle?: string;
}>();
</script>

<template>
  <div class="mt-10 flex w-full flex-col items-center justify-center">
    <NuxtImg
      src="https://devflow-rose.vercel.app/_next/image?url=%2Fassets%2Fimages%2Flight-illustration.png&w=384&q=75"
      width="270"
      height="200"
      class="block object-contain dark:hidden"
    />

    <NuxtImg
      src="https://devflow-rose.vercel.app/_next/image?url=%2Fassets%2Fimages%2Fdark-illustration.png&w=384&q=75"
      width="270"
      height="200"
      class="hidden object-contain dark:flex"
    />

    <h2 class="h2-bold text-dark200_light900 mt-8">
      {{ title }}
    </h2>
    <p class="body-regular text-dark500_light700 my-3.5 max-w-md text-center">
      {{ description }}
    </p>

    <NuxtLink v-if="link" :to="link">
      <Button
        class="paragraph-medium dark:bg-primary-500 mt-5 min-h-[46px] rounded-lg bg-main-500 px-4 py-3 text-light-900 hover:bg-main-500 dark:text-light-900"
        >{{ linkTitle }}</Button
      >
    </NuxtLink>
  </div>
</template>
