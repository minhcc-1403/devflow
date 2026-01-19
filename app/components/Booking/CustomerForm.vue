<script setup lang="ts">
import { ref } from "vue";

const form = ref({
  name: "",
  phone: "",
  email: "",
  accepted: false,
});
</script>

<template>
  <section class="rounded-xl border border-t bg-white p-5 pt-6">
    <div class="grid grid-cols-1 gap-8 lg:grid-cols-2">
      <!-- LEFT: FORM -->
      <div>
        <h3 class="mb-4 font-semibold">Thông tin khách hàng</h3>

        <!-- Họ tên -->
        <div class="mb-4">
          <label class="mb-1 block text-sm">
            Họ và tên <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <input
              v-model="form.name"
              type="text"
              class="w-full rounded-md border px-3 py-2 pr-8 focus:border-green-500 focus:ring-green-500"
              placeholder="Nhập họ và tên"
            />
            <button
              v-if="form.name"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
              @click="form.name = ''"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Số điện thoại -->
        <div class="mb-4">
          <label class="mb-1 block text-sm">
            Số điện thoại <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <input
              v-model="form.phone"
              type="tel"
              class="w-full rounded-md border px-3 py-2 pr-8 focus:border-green-500 focus:ring-green-500"
              placeholder="Nhập số điện thoại"
            />
            <button
              v-if="form.phone"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
              @click="form.phone = ''"
            >
              ✕
            </button>
          </div>
        </div>

        <!-- Email -->
        <div class="mb-6">
          <label class="mb-1 block text-sm">
            Email <span class="text-red-500">*</span>
          </label>
          <div class="relative">
            <input
              v-model="form.email"
              type="email"
              class="w-full rounded-md border px-3 py-2 pr-8 focus:border-green-500 focus:ring-green-500"
              placeholder="Nhập email"
            />
            <button
              v-if="form.email"
              class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
              @click="form.email = ''"
            >
              ✕
            </button>
          </div>
        </div>
      </div>

      <!-- RIGHT: ĐIỀU KHOẢN -->
      <div>
        <h3 class="mb-3 font-semibold text-green-500">ĐIỀU KHOẢN & LƯU Ý</h3>

        <p class="mb-3 text-sm font-medium text-red-500">
          Quý khách vui lòng Đăng ký/Đăng nhập tài khoản để nhận chương trình
          khuyến mãi.
        </p>

        <div class="space-y-3 text-sm leading-relaxed text-gray-700">
          <p>
            (*) Quý khách vui lòng có mặt tại bến xuất phát của xe trước ít nhất
            30 phút giờ xe khởi hành, mang theo thông báo đã thanh toán vé thành
            công có chứa mã vé được gửi từ hệ thống FUTA BUS LINES. Vui lòng
            liên hệ Trung tâm tổng đài
            <span class="font-medium text-green-500">1900 6067</span>
            để được hỗ trợ.
          </p>

          <p>
            (*) Nếu quý khách có nhu cầu trung chuyển, vui lòng liên hệ Tổng đài
            trung chuyển
            <span class="font-medium text-green-500">1900 6918</span>
            trước khi đặt vé. Chúng tôi không đón/trung chuyển tại những điểm xe
            trung chuyển không thể đỗ được.
          </p>

          <p>
            (*) Nếu quý khách có nhu cầu di chuyển chặng đường ngắn hơn so với
            hành trình, vui lòng gọi Tổng đài
            <span class="font-medium text-green-500">1900 6067</span>
            để được hưởng chính sách giá vé tốt nhất.
          </p>
        </div>
      </div>
    </div>

    <!-- Checkbox -->
    <label class="flex items-start gap-2 pt-6 text-sm">
      <input
        v-model="form.accepted"
        type="checkbox"
        class="mt-1 accent-green-500"
      />
      <span>
        <span class="text-green-500">Chấp nhận điều khoản</span>
        đặt vé & chính sách bảo mật thông tin của FUTA Bus Lines
      </span>
    </label>
  </section>
</template>
