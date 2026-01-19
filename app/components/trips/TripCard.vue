<script setup lang="ts">
import type { TimelineStop } from "~/validations/trip.validation";

const timeline: TimelineStop[] = [
  {
    time: "16:50",
    title: "172 Lê Duẩn - Đắk Lắk",
    address: "172 Lê Duẩn, phường Tân Thành, BMT, Đắk Lắk",
    type: "start",
  },
  {
    time: "15:00",
    title: "Đắk Nông",
    address: "226 Hai Bà Trưng, Phường Nghĩa Thành, TP Gia Nghĩa, Đắk Nông",
    type: "stop",
  },
  {
    time: "15:00",
    title: "Nam Phước",
    address: "VP Nam Phước: QL 1, TT Nam Phước, Duy Xuyên, Quảng Nam",
    type: "stop",
  },
  {
    time: "06:00",
    title: "Đà Nẵng",
    address: "201–203 Tôn Đức Thắng, Hòa Minh, Liên Chiểu, Đà Nẵng",
    type: "end",
  },
];

const activeTab = ref<"seat" | "timeline" | "transfer" | "policy" | null>(null);

const policy = `<h3>Chính sách huỷ vé</h3>
<ul>
  <li>Chỉ được chuyển đổi vé 1 lần duy nhất</li>
  <li>
    Chi phí huỷ vé từ 10% – 30% giá vé tuỳ thuộc thời gian huỷ vé
    so với giờ khởi hành ghi trên vé và số lượng vé cá nhân/tập thể
    áp dụng theo các quy định hiện hành.
  </li>
  <li>
    Quý khách khi có nhu cầu thay đổi hoặc huỷ vé đã thanh toán,
    cần liên hệ với Trung tâm tổng đài 1900 6067 hoặc quầy vé
    chậm nhất trước 24h so với giờ xe khởi hành được ghi trên vé,
    trên email hoặc tin nhắn để được hướng dẫn thêm.
  </li>
</ul>

<h3>Yêu cầu khi lên xe</h3>
<ul>
  <li>
    Có mặt tại Văn phòng/Bến xe (Địa điểm xe đón trực tiếp)
    trước 30 phút để làm thủ tục lên xe (đối với ngày lễ tết
    cần ra trước 60 phút).
  </li>
  <li>
    Xuất trình thông tin vé được gửi qua SMS/Email/Futa App
    hoặc liên hệ quầy vé để nhận thông tin vé trước khi lên xe.
  </li>
  <li>Không mang thức ăn/đồ uống có mùi lên xe.</li>
</ul>
`;
</script>

<template>
  <div class="rounded-xl border bg-white p-4">
    <div class="flex items-start gap-10">
      <TripTime />
      <TripMeta />
    </div>
    <MobileTripMeta />

    <div
      class="my-2 hidden items-center justify-between border-t md:flex md:flex-col"
    >
      <div class="flex w-full justify-between py-2">
        <div class="flex gap-4 text-sm text-muted-foreground">
          <button
            :class="
              activeTab === 'seat'
                ? 'border-b-2 border-green-500 text-green-500'
                : 'text-muted-foreground'
            "
            @click="activeTab = 'seat'"
          >
            Chọn ghế
          </button>
          <button
            :class="
              activeTab === 'timeline'
                ? 'border-b-2 border-green-500 text-green-500'
                : 'text-muted-foreground'
            "
            @click="activeTab = 'timeline'"
          >
            Lịch trình
          </button>
          <button
            :class="
              activeTab === 'transfer'
                ? 'border-b-2 border-green-500 text-green-500'
                : 'text-muted-foreground'
            "
            @click="activeTab = 'transfer'"
          >
            Trung chuyển
          </button>
          <button
            :html="policy"
            :class="
              activeTab === 'policy'
                ? 'border-b-2 border-green-500 text-green-500'
                : 'text-muted-foreground'
            "
            @click="activeTab = 'policy'"
          >
            Chính sách
          </button>
        </div>
        <TripActions />
      </div>

      <SeatSelector v-if="activeTab === 'seat'" />
      <TripTimeline v-if="activeTab === 'timeline'" :stops="timeline" />
      <TripTransfer v-if="activeTab === 'transfer'" />
      <TripPolicy v-if="activeTab === 'policy'" :html="policy" />
    </div>
  </div>
</template>

<style scoped lang="css">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
