<script setup lang="ts">
import { computed, ref } from "vue";

type Location = {
  id: string;
  label: string;
  address: string;
  time?: string;
};

const props = defineProps<{
  modelValue?: string;
  options: Location[];
  placeholder?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const open = ref(false);
const keyword = ref("");
const selected = ref(props.modelValue);

const filtered = computed(() =>
  props.options.filter((o) =>
    o.label.toLowerCase().includes(keyword.value.toLowerCase()),
  ),
);

function select(item: Location) {
  selected.value = item.id;
  emit("update:modelValue", item.id);
  open.value = false;
}
</script>

<template>
  <div class="relative">
    <!-- INPUT -->
    <button
      class="flex w-full items-center justify-between rounded-md border px-3 py-2 text-left"
      :class="open ? 'border-green-500' : ''"
      @click="open = !open"
    >
      <span class="truncate">
        {{
          options.find((o) => o.id === selected)?.label ||
          placeholder ||
          "Chọn địa điểm"
        }}
      </span>
      <span class="text-gray-400">▾</span>
    </button>

    <!-- DROPDOWN -->
    <div
      v-if="open"
      class="absolute z-20 mt-2 w-full rounded-xl border bg-white p-3 shadow-lg"
    >
      <input
        v-model="keyword"
        placeholder="Nhập tên bến xe, văn phòng"
        class="mb-3 w-full rounded-md border px-3 py-2 text-sm"
      >

      <div class="max-h-60 space-y-3 overflow-auto">
        <div
          v-for="item in filtered"
          :key="item.id"
          class="flex cursor-pointer gap-3"
          @click="select(item)"
        >
          <input
            type="radio"
            class="mt-1 accent-green-500"
            :checked="selected === item.id"
          >

          <div class="flex-1">
            <div class="flex justify-between text-sm font-medium">
              <span>{{ item.time }} - {{ item.label }}</span>
              <span class="text-xs text-green-500">Xem vị trí</span>
            </div>
            <p class="text-xs text-gray-500">
              {{ item.address }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
