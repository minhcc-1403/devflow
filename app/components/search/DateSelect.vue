<script setup lang="ts">
import {
  fromDate,
  getLocalTimeZone,
  type DateValue,
} from "@internationalized/date";
import { Solar } from "lunar-typescript";
import { computed, ref } from "vue";
const isOpen = ref(false);
const selectedDate = ref(
  fromDate(new Date(), getLocalTimeZone()),
) as Ref<DateValue>;

const formattedDate = computed(() => {
  const d = selectedDate.value;
  return `${d.day.toString().padStart(2, "0")}/${(d.month + 1).toString().padStart(2, "0")}/${d.year}`;
});

const dayOfWeek = computed(() => {
  const d = selectedDate.value;
  if (d.toDate("vi-VN").getDay() === 0) return "Chủ Nhật";
  return `Thứ ${d.toDate("vi-VN").getDay()}`;
});

// Function to get lunar display
const getLunarDisplay = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const solar = Solar.fromYmd(year, month, day);

  if (solar.getDay() === 1) {
    return `${solar.getLunar().getDay()}/${solar.getLunar().getMonth()}`;
  } else {
    return solar.getLunar().getDay();
  }
};
</script>
<template>
  <!-- Ngày đi -->
  <div>
    <label class="mb-1 block text-sm font-medium">Ngày đi</label>
    <Popover v-model:open="isOpen">
      <PopoverTrigger as-child>
        <div
          class="cursor-pointer rounded-lg border px-4 py-2.5 transition-colors hover:bg-gray-50"
        >
          <div class="font-semibold">{{ formattedDate }}</div>
          <div class="text-xs text-gray-500">{{ dayOfWeek }}</div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        class="w-auto rounded-lg bg-white p-0 shadow-lg"
        side="bottom"
        align="start"
      >
        <Calendar
          v-model="selectedDate"
          class="p-3"
          layout="grid"
          :min-date="fromDate(new Date(), getLocalTimeZone())"
          locale="vi-VN"
          :first-day-of-week="1"
        >
          <template #header="{ month, year, previousMonth, nextMonth }">
            <div class="flex items-center justify-between px-2 py-1">
              <span class="text-sm font-medium uppercase"
                >THÁNG {{ month + 1 }}/{{ year }}</span
              >
              <div class="flex space-x-2">
                <Button variant="ghost" size="icon" @click="previousMonth"
                  >&lt;</Button
                >
                <Button variant="ghost" size="icon" @click="nextMonth"
                  >&gt;</Button
                >
              </div>
            </div>
          </template>
          <template #day="{ date }">
            <div class="text-center">
              <div>{{ date.getDate() }}</div>
              <div class="text-xs text-gray-500">
                {{ getLunarDisplay(date) }} xxxx
              </div>
            </div>
          </template>
        </Calendar>
      </PopoverContent>
    </Popover>
  </div>
</template>

<style lang="css" scoped>
/* Customize selected date background to orange */
.calendar .selected {
  @apply rounded-full bg-green-100 text-green-900;
}
</style>
