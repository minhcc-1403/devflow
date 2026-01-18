<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  amount: {
    type: Number,
    default: 75000,
  },
  expire: {
    type: Number,
    default: 339, // giây
  },
});

const seconds = ref(props.expire);
const filePayment = ref(null);
const fileProof = ref(null);

onMounted(() => {
  setInterval(() => {
    if (seconds.value > 0) seconds.value--;
  }, 1000);
});

const time = computed(() => {
  const m = Math.floor(seconds.value / 60);
  const s = seconds.value % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
});
</script>

<template>
  <div class="my-6 rounded-xl bg-white p-6">
    <!-- NOTE -->
    <p class="mb-4 text-center text-sm text-gray-700">
      Sau khi gửi ảnh, vui lòng kiểm tra trạng thái lịch đặt tại tab
      <b>“Tài khoản”</b> tới khi chủ sân xác nhận đơn.
    </p>

    <!-- COUNTDOWN -->
    <div class="mb-6 text-center">
      <div class="text-sm text-gray-600">
        Đơn của bạn còn được giữ chỗ trong
      </div>
      <div class="mt-1 text-2xl font-bold text-gray-900">
        {{ time }}
      </div>
    </div>

    <!-- UPLOAD AREA -->
    <div class="mx-auto grid max-w-xl grid-cols-2 gap-4">
      <UploadBox
        label="Nhấn vào để tải hình thanh toán (*)"
        required
        @change="filePayment = $event"
      />
      <UploadBox
        label="Nhấn vào để tải minh chứng bạn là HSSV, hoặc đối tượng được ưu đãi khác"
        @change="fileProof = $event"
      />
    </div>

    <!-- SUBMIT -->
    <button
      class="mt-8 w-full rounded-lg bg-yellow-500 py-4 text-center font-semibold text-white hover:bg-yellow-600"
    >
      XÁC NHẬN ĐẶT
    </button>
  </div>
</template>
