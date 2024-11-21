<script setup lang="ts">
defineProps<{
  filters: {
    name: string;
    value: string;
  }[];

  otherClasses?: string;
  containerClasses?: string;
}>();
</script>

<template>
  <div :class="`relative ${containerClasses}`">
    <Select>
      <SelectTrigger
        :class="`${otherClasses} body-regular light-border bg-light800_dark300 text-dark500_light700 border px-5 py-2.5`"
      >
        <div class="line-clamp-1 flex-1 text-left">
          <SelectValue placeholder="Select a Filter" />
        </div>
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectItem
            v-for="filter in filters"
            :key="filter.value"
            :value="filter.value"
          >
            {{ filter.name }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
</template>
