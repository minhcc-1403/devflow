<script setup lang="ts">
defineProps<{
  amount: number | string;
  canPay: boolean;
}>();

defineEmits(["cancel", "submit"]);
</script>

<template>
  <div class="w-full border-t bg-white">
    <div class="flex items-center justify-between px-6 py-4">
      <!-- Left: Payment info -->
      <div class="flex items-center gap-3">
        <span
          class="rounded-full bg-green-700 px-3 py-1 text-xs font-semibold text-white"
        >
          VNPAY
        </span>

        <span class="text-xl font-semibold text-gray-900"> {{ amount }}đ </span>
      </div>

      <!-- Right: Actions -->
      <div class="flex items-center gap-3">
        <button
          class="rounded-full border border-gray-300 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
          @click="$emit('cancel')"
        >
          Hủy
        </button>

        <button
          :disabled="!canPay"
          class="rounded-full bg-green-500 px-6 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
          @click="$emit('submit')"
        >
          Thanh toán
        </button>
      </div>
    </div>
  </div>
</template>
