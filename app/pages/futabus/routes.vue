<script setup lang="ts">
definePageMeta({ layout: "no-layout" });

const routes = [
  [
    {
      id: 1,
      from: "An Hữu (Tiền Giang)",
      to: "TP.Hồ Chí Minh",
      type: "Limousine",
      distance: "127km",
      duration: "2 giờ",
    },
  ],
  [
    {
      id: 2,
      from: "An Khê (Gia Lai)",
      to: "TP.Hồ Chí Minh",
      type: "Limousine",
      distance: "640km",
      duration: "13 giờ",
    },
    {
      id: 3,
      from: "An Khê (Gia Lai)",
      to: "TP.Hồ Chí Minh",
      type: "Limousine",
      distance: "670km",
      duration: "13 giờ",
    },
  ],
  [
    {
      id: 4,
      from: "An Minh (Kiên Giang)",
      to: "TP.Hồ Chí Minh",
      type: "Limousine",
      distance: "295km",
      duration: "7 giờ",
    },
  ],
  [
    {
      id: 5,
      from: "An Nhơn",
      to: "TP.Hồ Chí Minh",
      type: "Giường",
      distance: "720km",
      duration: "13 giờ",
    },
    {
      id: 6,
      from: "An Nhơn",
      to: "TP.Hồ Chí Minh",
      type: "Giường",
      distance: "710km",
      duration: "12 giờ",
    },
    {
      id: 7,
      from: "An Nhơn",
      to: "TP.Hồ Chí Minh",
      type: "",
      distance: "688km",
      duration: "11 giờ",
    },
  ],
];
</script>

<template>
  <div class="mx-auto px-4 py-6">
    <div class="space-y-4">
      <!-- Search -->
      <div class="flex items-center gap-3">
        <SearchInput placeholder="Nhập điểm đi" />
        <div
          class="flex h-8 w-8 items-center justify-center rounded-full border bg-white text-green-500"
        >
          ⇄
        </div>
        <SearchInput placeholder="Nhập điểm đến" />
      </div>

      <!-- Table header -->
      <div
        class="grid grid-cols-6 rounded-lg border bg-white px-4 py-3 text-sm font-medium text-gray-600"
      >
        <div>Tuyến xe</div>
        <div>Loại xe</div>
        <div>Quãng đường</div>
        <div>Thời gian hành trình</div>
        <div>Giá vé</div>
        <div />
      </div>

      <!-- Routes -->
      <div
        v-for="(group, index) in routes"
        :key="index"
        class="rounded-xl border bg-white"
      >
        <div
          v-for="route in group"
          :key="route.id"
          class="grid grid-cols-6 items-center gap-2 border-t px-4 py-3 text-sm first:border-t-0"
        >
          <!-- Route -->
          <div class="font-medium text-green-500">
            {{ route.from }}
            <span class="mx-1">⇒</span>
            <span class="text-gray-900">{{ route.to }}</span>
          </div>

          <div>{{ route.type || "---" }}</div>
          <div>{{ route.distance }}</div>
          <div>{{ route.duration }}</div>
          <div>---</div>

          <div class="text-right">
            <button
              class="rounded-full bg-green-100 px-4 py-1 text-green-600 hover:bg-green-200"
            >
              Tìm tuyến xe
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
