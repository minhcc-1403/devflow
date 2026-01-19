<script setup lang="ts">
defineProps<{
  label: string;
  placeholder?: string;
  open: boolean;
}>();

const emit = defineEmits(["open", "close", "select"]);

const keyword = ref("");
const locations = [
  "An Giang",
  "Bà Rịa - Vũng Tàu",
  "Bạc Liêu",
  "Bắc Kạn",
  "Bắc Giang",
  "Đà Nẵng",
  "Đắk Lắk",
  "Hà Nội",
  "TP. Hồ Chí Minh",
];
const recent = [
  "Hà Nội",
  "TP. Hồ Chí Minh",
  "Đắk Lắk",
  "Đà Nẵng",
  "Bà Rịa - Vũng Tàu",
  "An Giang",
];

const filteredLocations = computed(() =>
  locations.filter((l) =>
    l.toLowerCase().includes(keyword.value.toLowerCase()),
  ),
);

function close() {
  emit("close");
}

function select(value: string) {
  keyword.value = value;
  emit("select", value);
  close();
}

function clear() {
  keyword.value = "";
}

const dropdownWrapper = ref<any>();
const openDropdown = () => {
  emit("open");
};

function handleClickOutside(e: MouseEvent) {
  if (dropdownWrapper.value && !dropdownWrapper.value.contains(e.target)) {
    emit("close");
  }
}

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
  <div class="relative">
    <!-- Label -->
    <label class="mb-1 block text-sm font-medium">
      {{ label }}
    </label>

    <!-- Input box -->
    <div
      class="flex cursor-text items-center rounded-lg border bg-white px-4 py-3"
      :class="open ? 'border-green-500 ring-1 ring-green-300' : ''"
      @click.stop="openDropdown"
      @focus="openDropdown"
    >
      <input
        v-model="keyword"
        :placeholder="placeholder"
        class="w-full py-2 text-sm outline-none"
      >

      <!-- Clear -->
      <button
        v-if="keyword"
        class="ml-2 text-gray-400 hover:text-gray-600"
        @click.stop="clear"
      >
        ✕
      </button>
    </div>

    <!-- DROPDOWN -->
    <div
      v-if="open"
      ref="dropdownWrapper"
      class="absolute inset-x-0 top-0 z-50 w-full rounded-xl border bg-white shadow-2xl md:w-96"
      @click.stop
    >
      <!-- Search input (inside popup) -->
      <div class="border-b p-4">
        <div class="relative">
          <input
            v-model="keyword"
            placeholder="Chọn điểm đi"
            class="w-full rounded-lg border px-3 py-3 pr-10 outline-none focus:border-green-500"
          >

          <!-- Clear button -->
          <button
            v-if="keyword"
            type="button"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-green-500"
            @click="clear"
          >
            ✕
          </button>
        </div>
      </div>

      <!-- Province list -->
      <div class="max-h-60 overflow-y-auto">
        <p class="px-4 py-2 text-xs font-semibold text-gray-500">
          TỈNH/THÀNH PHỐ
        </p>

        <button
          v-for="item in filteredLocations"
          :key="item"
          class="flex w-full items-center border-b border-gray-200 px-4 py-2 text-sm last:border-b-0 hover:bg-green-50"
          @click="select(item)"
        >
          {{ item }}
        </button>

        <p
          v-if="filteredLocations.length === 0"
          class="px-4 py-6 text-center text-sm text-gray-400"
        >
          Không tìm thấy địa điểm
        </p>
      </div>

      <!-- Recent -->
      <div class="border-t p-4">
        <p class="mb-2 text-xs font-semibold text-gray-500">TÌM KIẾM GẦN ĐÂY</p>

        <div class="flex flex-wrap gap-2">
          <button
            v-for="item in recent"
            :key="item"
            class="rounded-lg border px-3 py-1 text-sm hover:border-green-400"
            @click="select(item)"
          >
            {{ item }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
