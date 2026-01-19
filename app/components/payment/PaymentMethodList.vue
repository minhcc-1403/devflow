<script setup lang="ts">
const model = ref<string | null>(null);

const methods = [
  {
    key: "VNPay",
    label: "Thanh toán VietQR",
    icon: "https://storage.googleapis.com/futa-busline-web-cms-prod/VNPAY_payment_f70a6c71dc/VNPAY_payment_f70a6c71dc.png",
    note: "Nhập VNPAYFUTA26 - Giảm 15K đơn từ 300K, giảm 30K đơn từ 750K",
  },
  {
    key: "ZaloPay",
    label: "ZaloPay",
    icon: "https://storage.googleapis.com/futa-busline-web-cms-prod/zalopay_fcfdae0580/zalopay_fcfdae0580.svg",
    note: "Giảm 25% tối đa 20k cho khách hàng lần đầu thanh toán; giảm 10k cho cho tất cả các giao dịch.",
  },
  {
    key: "MAI_LINH",
    label: "Mai Linh",
    icon: "https://storage.googleapis.com/futa-busline-web-cms-prod/futapay_db8da73dc3/futapay_db8da73dc3.svg",
    note: "Thanh toán qua Mai Linh",
  },
  {
    key: "MBBANK",
    label: "MB Bank",
    icon: "https://storage.googleapis.com/futa-busline-web-cms-prod/viet_QR_e6b170910a/viet_QR_e6b170910a.png",
    note: "QR chuyển khoản, quét mã thanh toán an toàn và tiện lợi.",
  },
];
</script>

<template>
  <div class="rounded-xl bg-white p-4">
    <h2 class="mb-4 text-lg font-semibold">Chọn phương thức thanh toán</h2>

    <div class="space-y-3">
      <label
        v-for="item in methods"
        :key="item.key"
        class="flex cursor-pointer items-center gap-3 rounded-lg border p-3 hover:bg-gray-50"
      >
        <input
          v-model="model"
          type="radio"
          class="accent-green-500"
          :value="item.key"
        >
        <img :src="item.icon" class="h-8 w-8" >
        <div>
          <div class="font-medium">{{ item.label }}</div>
          <div v-if="item.note" class="text-xs text-green-500">
            {{ item.note }}
          </div>
        </div>
      </label>
    </div>
  </div>
</template>
