<script setup>
import FilterSidebar from "@/components/filters/FilterSidebar.vue";
import TripList from "@/components/trips/TripList.vue";
</script>

<template>
  <MainLayout>
    <div class="container mx-auto grid grid-cols-12 gap-6 py-6">
      <!-- Sidebar -->
      <aside class="col-span-3">
        <FilterSidebar />
      </aside>

      <!-- Content -->
      <main class="col-span-9">
        <TripList />
      </main>
    </div>
  </MainLayout>
</template>
