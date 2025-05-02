<script setup lang="ts">
import type { Trip } from "~/validations/trip.validation";

definePageMeta({ layout: "no-layout" });

// const date = ref(fromDate(new Date(), getLocalTimeZone())) as Ref<DateValue>;
// const tripType = ref("one-way");
// const from = ref("dak-lak");
// const to = ref("da-nang");
// const tickets = ref(1);

const selectedTrip = ref<Trip | null>(null);

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
</script>

<template>
  <div>
    <div class="hidden md:block">
      <HeroBanner
        title="Futabus"
        description="A community for developers, ask questions and get answers."
        image="https://api.huonganhgroup.vn/static/upload/image/1768727497064_b9325bded872cb0de35e563c_4e7c3aef7148c10ee.png"
      />
    </div>
    <div class="container mx-auto grid grid-cols-12 gap-6 py-6">
      <!-- Sidebar -->
      <aside class="col-span-4">
        <FilterSidebar />
      </aside>

      <!-- Content -->
      <main class="col-span-8">
        <TripList
          :trips="trips"
          route-name="Đắk Lắk - Đà Nẵng"
          @select="selectedTrip = $event"
        />
      </main>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
