<script setup>
const navigatoBooking = () => {
  navigateTo("/futabus/booking");
};
</script>

<template>
  <Button
    class="rounded-full bg-green-500 hover:bg-green-600"
    @click="navigatoBooking"
  >
    Chọn chuyến
  </Button>
</template>
