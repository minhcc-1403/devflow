<script setup lang="ts">
defineProps<{
  label?: string;
  required?: boolean;
}>();

const emit = defineEmits(["change"]);

function onChange(e: any) {
  emit("change", e.target.files[0]);
}
</script>

<template>
  <label
    class="flex h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed bg-white text-center hover:border-green-400"
  >
    <input type="file" accept="image/*" class="hidden" @change="onChange" >

    <div class="mb-2 text-gray-400">
      <slot>
        <svg
          class="mx-auto h-8 w-8"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 16.5V8.25A2.25 2.25 0 015.25 6h13.5A2.25 2.25 0 0121 8.25v8.25M3 16.5l4.72-4.72a2.25 2.25 0 013.18 0L15 15l2.47-2.47a2.25 2.25 0 013.18 0L21 13.5M3 16.5V19.5A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 19.5v-3"
          />
        </svg>
      </slot>
    </div>

    <div class="text-sm text-gray-600">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </div>
  </label>
</template>
