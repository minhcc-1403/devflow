<script setup lang="ts">
definePageMeta({ layout: "no-layout" });

const loading = ref(false);
const ticket = ref<any>({
  code: "PT123456",
  status: "Đã thanh toán",
  route: "An Giang → TP.Hồ Chí Minh",
  departure: "08:00 - 20/01/2026",
  seats: ["A01", "A02"],
  total: "350.000",
});

// mock: gọi sau khi ấn tra cứu
// function searchTicket() {
//   loading.value = true;
//   setTimeout(() => {
//     loading.value = false;
//   }, 1500);
// }

function statusClass(status: string) {
  return status === "Đã thanh toán"
    ? "bg-green-100 text-green-700"
    : "bg-yellow-100 text-yellow-700";
}
</script>

<template>
  <div class="mx-auto px-4 py-6">
    <div class="flex items-center justify-center bg-white py-6">
      <div class="w-full max-w-xl text-center">
        <!-- Title -->
        <h2 class="mb-8 text-lg font-semibold text-emerald-600">
          TRA CỨU THÔNG TIN ĐẶT VÉ
        </h2>

        <!-- Form -->
        <div class="space-y-4">
          <input
            type="text"
            placeholder="Vui lòng nhập số điện thoại"
            class="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-emerald-500"
          >

          <input
            type="text"
            placeholder="Vui lòng nhập mã vé"
            class="w-full rounded-lg border px-4 py-3 text-sm outline-none focus:border-emerald-500"
          >

          <!-- Button -->
          <div class="pt-4">
            <button
              class="rounded-full bg-green-100 px-10 py-2 text-sm font-medium text-green-600 transition hover:bg-green-200"
            >
              Tra cứu
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10">
      <!-- LOADING -->
      <div v-if="loading" class="py-10 text-center">
        <div
          class="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-green-500 border-t-transparent"
        />
        <p class="mt-3 text-sm text-gray-500">Đang tra cứu thông tin vé...</p>
      </div>

      <!-- NOT FOUND -->
      <div
        v-else-if="!ticket"
        class="rounded-lg border border-red-200 bg-red-50 p-6 text-center"
      >
        <p class="font-semibold text-red-600">❌ Không tìm thấy thông tin vé</p>
        <p class="mt-2 text-sm text-gray-500">
          Vui lòng kiểm tra lại số điện thoại hoặc mã vé
        </p>
      </div>

      <!-- FOUND -->
      <div v-else class="space-y-4 rounded-xl border bg-white p-6 shadow-sm">
        <div class="flex items-center justify-between">
          <h3 class="font-semibold text-green-600">✅ Đã tìm thấy vé</h3>

          <span
            class="rounded-full px-3 py-1 text-xs"
            :class="statusClass(ticket.status)"
          >
            {{ ticket.status }}
          </span>
        </div>

        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p class="text-xs text-gray-500">Mã vé</p>
            <p class="font-medium">{{ ticket.code }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500">Tuyến</p>
            <p class="font-medium">{{ ticket.route }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500">Khởi hành</p>
            <p class="font-medium">{{ ticket.departure }}</p>
          </div>
          <div>
            <p class="text-xs text-gray-500">Ghế</p>
            <p class="font-medium">{{ ticket.seats.join(", ") }}</p>
          </div>
        </div>

        <div class="flex items-center justify-between border-t pt-4">
          <p class="font-semibold text-green-600">
            Tổng tiền: {{ ticket.total }}đ
          </p>

          <div class="flex gap-3">
            <button class="btn-outline">Xem chi tiết</button>
            <button class="btn-danger">Hủy vé</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.btn-outline {
  @apply rounded-lg border border-green-500 px-4 py-2 text-sm text-green-500 hover:bg-green-50;
}

.btn-danger {
  @apply rounded-lg bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600;
}
</style>
