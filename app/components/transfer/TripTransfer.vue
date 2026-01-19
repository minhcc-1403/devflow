<script setup lang="ts">
import type { TransferRule } from "~/validations/trip.validation";

defineProps<{
  rules?: TransferRule[];
}>();

const defaultRules: TransferRule[] = [
  {
    title: "Đón/ trả tận nơi:",
    items: [
      "Thời gian nhận khách: Trước 4 tiếng.",
      "Thời gian xe đón: Chuẩn bị trước 2 - 3 tiếng, do mật độ giao thông trong thành phố và sẽ kết hợp đón nhiều điểm khác nhau nên thời gian đón cụ thể tài xế sẽ liên hệ giờ.",
      "Hẻm nhỏ xe không quay đầu được: Xe trung chuyển sẽ đón Khách đầu hẻm/ đầu đường.",
      "Khu vực có biển cấm dừng đỗ xe không đón được: Xe trung chuyển sẽ đón tại vị trí gần nhất có thể.",
      "Hành lý: Hành lý nhỏ gọn dưới 20kg, không vận chuyển kèm động vật, thú cưng, không mang đồ có mùi, đồ chảy nước trên xe.",
    ],
  },
];
</script>

<template>
  <div class="space-y-4 pt-4 text-sm">
    <div v-for="(rule, index) in rules || defaultRules" :key="index">
      <p class="mb-2 font-semibold">
        {{ rule.title }}
      </p>

      <ul class="list-inside list-disc space-y-1 text-muted-foreground">
        <li v-for="(item, i) in rule.items" :key="i">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>
