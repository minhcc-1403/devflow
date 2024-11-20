<script setup lang="ts">
defineProps<{
  route: string;
  iconPosition: "left" | "right";
  imgSrc: string;
  placeholder: string;
  otherClasses?: string;
}>();
</script>

<template>
  <div
    :class="`bg-light800_darkgradient flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`"
  >
    <NuxtImg
      v-if="iconPosition === 'left'"
      :src="imgSrc"
      alt="Search icon"
      width="24"
      height="24"
      class="cursor-pointer"
    />

    <Input
      type="text"
      :placeholder="placeholder"
      class="paragraph-regular placeholder text-dark400_light700 border-none shadow-none outline-none focus:border-none focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-transparent"
    />

    <NuxtImg
      v-if="iconPosition === 'right'"
      :src="imgSrc"
      alt="Search icon"
      width="24"
      height="24"
      class="cursor-pointer"
    />
  </div>
</template>
