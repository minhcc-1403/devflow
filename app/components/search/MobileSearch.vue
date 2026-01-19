<script setup lang="ts">
const from = ref("Đắk Lắk");
const to = ref("Đà Nẵng");
const openType = ref<"from" | "to" | null>(null);
const emit = defineEmits(["search"]);

function openFrom() {
  openType.value = "from";
}

function openTo() {
  openType.value = "to";
}

function closeAll() {
  openType.value = null;
}

const swapLocation = () => {
  const temp = from.value;
  from.value = to.value;
  to.value = temp;
  closeAll();
};

const onOpenSearchResult = () => {
  emit("search", { from: from.value, to: to.value });
  // TODO: Navigate to search results page
};
</script>

<template>
  <!-- MOBILE ONLY -->
  <section class="relative z-50 mx-auto -mt-40 block px-4 md:hidden">
    <div class="rounded-2xl border border-green-300 bg-white p-4 shadow-xl">
      <!-- Trip type -->
      <div class="mb-4 flex items-center gap-6 text-sm">
        <label class="flex cursor-pointer items-center gap-2 text-green-600">
          <input type="radio" checked class="accent-green-500" >
          Một chiều
        </label>

        <label class="flex cursor-pointer items-center gap-2 text-gray-600">
          <input type="radio" class="accent-green-500" >
          Khứ hồi
        </label>
      </div>

      <!-- FROM / TO -->
      <div class="relative">
        <div class="space-y-4">
          <LocationSelect
            label="Điểm đi"
            placeholder="Chọn điểm đi"
            :open="openType === 'from'"
            @open="openFrom"
            @close="closeAll"
          />

          <LocationSelect
            label="Điểm đến"
            placeholder="Chọn điểm đến"
            :open="openType === 'to'"
            @open="openTo"
            @close="closeAll"
          />
        </div>

        <!-- Swap button -->
        <button
          type="button"
          class="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow-md"
          @click="swapLocation"
        >
          <img
            src="https://futabus.vn/images/icons/switch_location.svg"
            alt="Swap"
            class="h-6 w-6 transition-all duration-300 active:rotate-180"
          >
        </button>
      </div>

      <!-- DATE + TICKET -->
      <div class="mt-4 grid grid-cols-2 gap-3">
        <div>
          <DateSelect />
        </div>

        <div>
          <label class="mb-1 block text-sm font-medium">Số vé</label>
          <select
            class="w-full rounded-lg border px-4 py-[18px] text-base outline-none focus:border-green-500"
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
      </div>

      <!-- RECENT -->
      <div class="my-4">
        <p class="mb-2 text-sm font-medium">Tìm kiếm gần đây</p>
        <div class="flex gap-2 overflow-x-auto pb-1">
          <div
            v-for="item in [
              { title: 'Đắk Lắk - Đà Nẵng', date: '22/01/2026' },
              { title: 'Hà Nội - TP. Hồ Chí Minh', date: '09/01/2026' },
              { title: 'An Giang - Bà Rịa - Vũng Tàu', date: '08/01/2026' },
            ]"
            :key="item.title"
            class="min-w-[180px] rounded-lg border px-3 py-2"
          >
            <p class="text-xs font-semibold">{{ item.title }}</p>
            <p class="text-[10px] text-gray-400">{{ item.date }}</p>
          </div>
        </div>
      </div>

      <!-- SEARCH BUTTON -->
      <div class="mt-6">
        <button
          class="w-full rounded-full bg-green-500 py-3 text-center font-semibold text-white shadow-sm active:scale-95"
          @click="onOpenSearchResult"
        >
          Tìm chuyến xe
        </button>
      </div>
    </div>
  </section>
</template>
