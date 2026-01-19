<script setup lang="ts">
import { computed, ref } from "vue";

type Seat = {
  code: string;
  floor: "LOWER" | "UPPER";
  status: "sold" | "empty";
};

const seats = ref<Seat[]>([
  // TẦNG DƯỚI
  { code: "A01", floor: "LOWER", status: "empty" },
  { code: "A02", floor: "LOWER", status: "empty" },
  { code: "A03", floor: "LOWER", status: "sold" },
  { code: "A04", floor: "LOWER", status: "empty" },
  { code: "A05", floor: "LOWER", status: "empty" },
  { code: "A06", floor: "LOWER", status: "sold" },
  { code: "A07", floor: "LOWER", status: "sold" },
  { code: "A08", floor: "LOWER", status: "empty" },
  { code: "A09", floor: "LOWER", status: "empty" },
  { code: "A10", floor: "LOWER", status: "empty" },
  { code: "A11", floor: "LOWER", status: "empty" },
  { code: "A12", floor: "LOWER", status: "empty" },
  { code: "A13", floor: "LOWER", status: "empty" },
  { code: "A15", floor: "LOWER", status: "empty" },
  { code: "A16", floor: "LOWER", status: "empty" },
  { code: "A17", floor: "LOWER", status: "empty" },

  // TẦNG TRÊN
  { code: "B01", floor: "UPPER", status: "empty" },
  { code: "B02", floor: "UPPER", status: "empty" },
  { code: "B03", floor: "UPPER", status: "empty" },
  { code: "B04", floor: "UPPER", status: "empty" },
  { code: "B05", floor: "UPPER", status: "empty" },
  { code: "B06", floor: "UPPER", status: "empty" },
  { code: "B07", floor: "UPPER", status: "empty" },
  { code: "B08", floor: "UPPER", status: "empty" },
  { code: "B09", floor: "UPPER", status: "empty" },
  { code: "B10", floor: "UPPER", status: "empty" },
  { code: "B11", floor: "UPPER", status: "empty" },
  { code: "B12", floor: "UPPER", status: "empty" },
  { code: "B13", floor: "UPPER", status: "empty" },
  { code: "B14", floor: "UPPER", status: "empty" },
  { code: "B15", floor: "UPPER", status: "empty" },
  { code: "B16", floor: "UPPER", status: "empty" },
  { code: "B17", floor: "UPPER", status: "empty" },
]);

const selectedSeats = ref<string[]>([]);

const lowerSeats = computed(() =>
  seats.value.filter((s) => s.floor === "LOWER"),
);

const upperSeats = computed(() =>
  seats.value.filter((s) => s.floor === "UPPER"),
);

function toggleSeat(seat: Seat) {
  if (seat.status === "sold") return;

  const idx = selectedSeats.value.indexOf(seat.code);
  if (idx > -1) selectedSeats.value.splice(idx, 1);
  else selectedSeats.value.push(seat.code);
}

const seatColumns = ref(3); // 1 | 2 | 3 | 4 (backend trả)
const gridClass = computed(() => ({
  "grid-cols-1": seatColumns.value === 1,
  "grid-cols-2": seatColumns.value === 2,
  "grid-cols-3": seatColumns.value === 3,
  "grid-cols-4": seatColumns.value === 4,
}));
</script>

<template>
  <div class="rounded-xl border bg-white p-5">
    <!-- HEADER -->
    <div class="mb-4 flex items-center justify-between">
      <h2 class="font-semibold">Chọn ghế</h2>
      <a href="#" class="text-sm text-blue-600">Thông tin xe</a>
    </div>

    <!-- BODY -->
    <div class="grid grid-cols-2 gap-12">
      <!-- TẦNG DƯỚI -->
      <div>
        <h3 class="mb-3 text-center text-sm font-medium">Tầng dưới</h3>
        <div :class="gridClass" class="grid gap-3">
          <SeatBookingItem
            v-for="seat in lowerSeats"
            :key="seat.code"
            :seat="seat"
            :selected-seats="selectedSeats"
            @toggle="toggleSeat"
          />
        </div>
      </div>

      <!-- TẦNG TRÊN -->
      <div>
        <h3 class="mb-3 text-center text-sm font-medium">Tầng trên</h3>
        <div :class="gridClass" class="grid gap-3">
          <SeatBookingItem
            v-for="seat in upperSeats"
            :key="seat.code"
            :seat="seat"
            :selected-seats="selectedSeats"
            @toggle="toggleSeat"
          />
        </div>
      </div>
    </div>

    <!-- LEGEND -->
    <div class="mt-6 flex justify-end gap-6 text-xs text-gray-600">
      <BookingLegend color="bg-gray-300" label="Đã bán" />
      <BookingLegend color="bg-blue-100" label="Còn trống" />
      <BookingLegend color="bg-green-100" label="Đang chọn" />
    </div>
  </div>
</template>
