<script setup lang="ts">
import type { Trip } from "~/validations/trip.validation";

definePageMeta({ layout: "no-layout" });

// const date = ref(fromDate(new Date(), getLocalTimeZone())) as Ref<DateValue>;
// const tripType = ref("one-way");
// const from = ref("dak-lak");
// const to = ref("da-nang");
// const tickets = ref(1);

const selectedTrip = ref<Trip | null>(null);

// const totalPrice = computed(() => {
//   if (!selectedTrip.value) return 0;
//   return selectedTrip.value.price;
// });

// const canPay = computed(() => {
//   return totalPrice.value > 0;
// });

// const onPayment = () => {};

// const onCancel = () => {};

const trips: Trip[] = [
  {
    id: "1",
    date: "Thứ 5, 22/01/2026",
    route: "Đắk Nông - Đà Nẵng",
    departTime: "15:00",
    departStation: "Bến Xe Đắk Nông",
    arriveTime: "06:00",
    arriveStation: "Bến Xe Trung Tâm Đà Nẵng",
    duration: "15 giờ",
    vehicleType: "Limousine",
    price: 400000,
  },
];

onMounted(() => {
  selectedTrip.value = trips[0]!;
});

const method = ref("FUTAPAY");
</script>

<template>
  <div class="mx-auto px-4 py-6">
    <div class="grid grid-cols-12 gap-6">
      <!-- LEFT -->
      <div class="col-span-4 space-y-4 rounded-xl bg-white">
        <PaymentMethodList v-model="method" />
      </div>

      <!-- CENTER -->
      <div class="col-span-4">
        <PaymentQRCode :amount="400000" :expire="1199" method="FUTAPAY" />
      </div>

      <!-- RIGHT -->
      <div class="col-span-4 space-y-4">
        <PassengerInfoCard />
        <TripInfoCard />
        <PriceDetailCard />
      </div>
    </div>

    <BankTransferConfirm :amount="75000" :expire="339" />
  </div>
</template>

<style lang="scss" scoped></style>
