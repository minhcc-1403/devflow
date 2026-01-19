<script setup lang="ts">
definePageMeta({ layout: "no-layout" });
</script>

<template>
  <div class="mx-auto px-4 py-6">
    <div class="bg-white py-12">
      <div class="mx-auto max-w-6xl px-4">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
          <!-- LEFT: CONTACT INFO -->
          <div>
            <h2 class="mb-4 text-lg font-semibold uppercase">
              Liên hệ với chúng tôi
            </h2>

            <div class="space-y-2 text-sm">
              <p class="font-medium">▶ FUTA BUS LINES</p>

              <p class="font-semibold text-green-600">
                CÔNG TY CỔ PHẦN XE KHÁCH <br >
                PHƯƠNG TRANG - FUTA BUS LINES
              </p>

              <p>
                <strong>Địa chỉ:</strong>
                486-486A Lê Văn Lương, Phường Tân Hưng, TPHCM, Việt Nam.
              </p>

              <p>
                <strong>Website:</strong>
                <a
                  href="https://futabus.vn"
                  target="_blank"
                  class="text-blue-600 hover:underline"
                >
                  https://futabus.vn/
                </a>
              </p>

              <p><strong>Điện thoại:</strong> 02838386852</p>
              <p><strong>Fax:</strong> 02838386853</p>
              <p><strong>Email:</strong> hotro@futa.vn</p>
              <p><strong>Hotline:</strong> 19006067</p>
            </div>
          </div>

          <!-- RIGHT: CONTACT FORM -->
          <div class="rounded-lg bg-gray-100 p-6">
            <div class="mb-6 flex items-center gap-2 text-green-600">
              <span class="text-xl">✉</span>
              <h3 class="font-semibold">Gửi thông tin liên hệ đến chúng tôi</h3>
            </div>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
              <select class="input">
                <option>FUTA BUS LINES</option>
              </select>

              <input class="input" placeholder="Họ và tên" >

              <input class="input" placeholder="Email" >
              <input class="input" placeholder="Số điện thoại" >
            </div>

            <div class="mt-4 space-y-4">
              <input class="input" placeholder="Nhập Tiêu đề" >

              <textarea
                rows="5"
                class="input resize-none"
                placeholder="Nhập ghi chú"
              />

              <div class="text-center">
                <button
                  class="rounded-full bg-green-500 px-10 py-2 text-sm font-semibold text-white transition hover:bg-green-600"
                >
                  Gửi
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.input {
  @apply w-full rounded-lg border bg-white px-4 py-2 text-sm outline-none focus:border-green-500;
}
</style>
