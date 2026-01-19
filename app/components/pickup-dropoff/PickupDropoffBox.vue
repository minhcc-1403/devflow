<script setup lang="ts">
import { ref } from "vue";

const pickupType = ref<"station" | "transfer">("station");
const dropoffType = ref<"station" | "transfer">("station");

const pickupLocation = ref("");
const dropoffLocation = ref("");

const locations = [
  {
    id: "daknong",
    time: "15:00",
    label: "Dak Nong",
    address: "226 Hai Bà Trưng, TP Gia Nghĩa, Đắk Nông",
  },
  {
    id: "daklak",
    time: "16:50",
    label: "172 Lê Duẩn - Dak Lak",
    address: "172 Lê Duẩn, TP Buôn Ma Thuột, Đắk Lắk",
  },
  {
    id: "danang",
    time: "06:00",
    label: "Đà Nẵng",
    address: "201-203 Tôn Đức Thắng, Liên Chiểu",
  },
];
</script>

<template>
  <div class="rounded-xl border border-t bg-white p-5 pt-6">
    <div class="mb-4 flex items-center gap-2">
      <h3 class="font-semibold">Thông tin đón trả</h3>
      <span class="text-green-500">ⓘ</span>
    </div>

    <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
      <!-- ĐIỂM ĐÓN -->
      <div>
        <h4 class="mb-2 font-medium">ĐIỂM ĐÓN</h4>

        <div class="mb-3 flex gap-4 text-sm">
          <label class="flex items-center gap-1">
            <input
              v-model="pickupType"
              type="radio"
              value="station"
              class="accent-green-500"
            />
            Bến xe/VP
          </label>

          <label class="flex items-center gap-1 text-gray-400">
            <input type="radio" disabled />
            Trung chuyển
          </label>
        </div>

        <PickupLocationSelect
          v-model="pickupLocation"
          :options="locations"
          placeholder="Chọn điểm đón"
        />

        <p class="mt-3 text-sm">
          Quý khách vui lòng có mặt tại
          <b>Dak Nong</b>
          <span class="font-medium text-red-500"> Trước 14:45 30/01/2026 </span>
          để được trung chuyển hoặc kiểm tra thông tin trước khi lên xe.
        </p>
      </div>

      <!-- ĐIỂM TRẢ -->
      <div>
        <h4 class="mb-2 font-medium">ĐIỂM TRẢ</h4>

        <div class="mb-3 flex gap-4 text-sm">
          <label class="flex items-center gap-1">
            <input
              v-model="dropoffType"
              type="radio"
              value="station"
              class="accent-green-500"
            />
            Bến xe/VP
          </label>

          <label class="flex items-center gap-1 text-gray-400">
            <input type="radio" disabled />
            Trung chuyển
          </label>
        </div>

        <PickupLocationSelect
          v-model="dropoffLocation"
          :options="locations"
          placeholder="Chọn điểm trả"
        />
      </div>
    </div>
  </div>
</template>
