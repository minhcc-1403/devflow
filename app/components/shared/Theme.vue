<script setup lang="ts">
import { themes } from "~/utils/constants";

const colorMode = useColorMode();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost">
        <Icon
          name="solar:sun-bold"
          class="size-6 rotate-0 scale-100 text-main-500 transition-all dark:-rotate-90 dark:scale-0"
        />

        <Icon
          name="akar-icons:moon-fill"
          class="absolute size-6 rotate-90 scale-0 text-main-500 transition-all dark:rotate-0 dark:scale-100"
        />

        <span class="sr-only">Toggle theme</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent
      align="end"
      class="minx-w-[120px] absolute right-[-3rem] mt-3 rounded border py-2 dark:border-[#212734] dark:bg-[#151821]"
    >
      <DropdownMenuItem
        v-for="theme in themes"
        :key="theme.value"
        :class="{ 'text-main-500': colorMode.preference === theme.value }"
        @click="colorMode.preference = theme.value"
      >
        <Icon :name="theme.icon" class="mr-2 size-4" />
        <span class="text-sm">
          {{ theme.label }}
        </span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
