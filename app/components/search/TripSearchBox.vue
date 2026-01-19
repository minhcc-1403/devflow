<script setup lang="ts">
const from = ref("Cao Bằng");
const to = ref("Đà Nẵng");
const openType = ref<"from" | "to" | null>(null);

function openFrom() {
  openType.value = "from";
}

function openTo() {
  openType.value = "to";
}

function closeAll() {
  openType.value = null;
}

/**
 * from | to | null
 */
const activeDropdown = ref(null);

const swapLocation = () => {
  const temp = from.value;
  from.value = to.value;
  to.value = temp;

  activeDropdown.value = null;
  closeAll();
};
</script>
<template>
  <section class="relative z-40 mx-auto -mt-40 max-w-7xl px-4 md:mt-6">
    <div class="rounded-2xl border border-green-300 bg-white p-6 shadow-sm">
      <!-- TOP OPTIONS -->
      <div class="mb-6 flex items-center justify-between">
        <!-- Trip type -->
        <div class="flex items-center gap-6 text-sm">
          <label class="flex cursor-pointer items-center gap-2 text-green-600">
            <input type="radio" checked class="accent-green-500" >
            Một chiều
          </label>

          <label class="flex cursor-pointer items-center gap-2 text-gray-600">
            <input type="radio" class="accent-green-500" >
            Khứ hồi
          </label>
        </div>

        <!-- Guide -->
        <button class="text-sm text-green-500 hover:underline">
          Hướng dẫn mua vé
        </button>
      </div>

      <!-- MAIN FORM -->
      <div class="grid grid-cols-1 gap-4 md:grid-cols-4">
        <!-- Wrapper 2 input -->
        <div class="relative col-span-2 grid grid-cols-2 gap-4">
          <!-- Điểm đi -->
          <LocationSelect
            label="Điểm đi"
            placeholder="Chọn điểm đi"
            :open="openType === 'from'"
            @open="openFrom"
            @close="closeAll"
          />

          <!-- Điểm đến -->
          <LocationSelect
            label="Điểm đến"
            placeholder="Chọn điểm đến"
            :open="openType === 'to'"
            @open="openTo"
            @close="closeAll"
          />

          <!-- Swap button -->
          <button
            type="button"
            class="group absolute left-1/2 top-1/2 z-20 mt-2 -translate-x-1/2 -translate-y-1/2"
            @click="swapLocation"
          >
            <img
              src="https://futabus.vn/images/icons/switch_location.svg"
              alt="Swap"
              class="transition-all duration-300 ease-in-out group-hover:rotate-180 group-hover:scale-110"
            >
          </button>
        </div>

        <!-- Ngày đi -->
        <DateSelect />

        <!-- Số vé -->
        <div>
          <label class="mb-1 block text-sm font-medium">Số vé</label>
          <select
            class="w-full rounded-lg border px-4 py-[18px] outline-none focus:border-green-500"
          >
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
          </select>
        </div>
      </div>

      <!-- RECENT SEARCH -->
      <div class="mt-6">
        <p class="mb-3 text-sm font-medium">Tìm kiếm gần đây</p>

        <div class="flex flex-wrap gap-4">
          <RecentItem title="Đắk Lắk - Đà Nẵng" date="22/01/2026" />
          <RecentItem title="Hà Nội - TP. Hồ Chí Minh" date="09/01/2026" />
          <RecentItem title="An Giang - Bà Rịa - Vũng Tàu" date="08/01/2026" />
        </div>
      </div>

      <!-- SEARCH BUTTON -->
      <div class="mt-8 flex justify-center">
        <button
          class="rounded-full bg-green-500 px-12 py-3 font-semibold text-white hover:bg-green-600"
        >
          Tìm chuyến xe
        </button>
      </div>
    </div>
  </section>
</template>

<style lang="css" scoped>
.swap-rotate {
  transition: transform 0.3s;
}
.swap-rotate:active {
  transform: rotate(180deg);
}
</style>
