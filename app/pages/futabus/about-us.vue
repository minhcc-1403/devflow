<script setup lang="ts">
definePageMeta({ layout: "no-layout" });
</script>

<template>
  <div class="mx-auto px-4 py-6">
    <div class="bg-white">
      <div class="mx-auto max-w-6xl space-y-20 px-4 py-12">
        <!-- PHƯƠNG TRANG -->
        <section class="mx-auto max-w-4xl text-center">
          <h1 class="text-2xl font-bold text-green-600">PHƯƠNG TRANG</h1>
          <p class="mt-2 italic text-gray-600">“Chất lượng là danh dự”</p>

          <p class="mt-6 text-sm leading-relaxed text-gray-700">
            Tập đoàn Phương Trang – FUTA Group được thành lập năm 2001. Với hoạt
            động kinh doanh chính trong lĩnh vực mua bán ô tô, vận tải hành
            khách, bất động sản và kinh doanh dịch vụ. Phương Trang dần trở
            thành cái tên quen thuộc trong ngành dịch vụ trên mọi miền đất nước.
            <br ><br >
            Trải qua hơn 25 năm hình thành và phát triển, Phương Trang tự hào
            trở thành doanh nghiệp vận tải hàng đầu Việt Nam với hệ thống chi
            nhánh rộng khắp cả nước.
          </p>

          <button
            class="mt-4 text-sm text-gray-500 transition hover:text-green-500"
          >
            Xem thêm ⌄
          </button>
        </section>

        <!-- TẦM NHÌN & SỨ MỆNH -->
        <section class="grid items-center gap-10 md:grid-cols-2">
          <img
            src="https://cdn.futabus.vn/futa-busline-web-cms-prod/Artboard_3_3x_fb31ff2c98/Artboard_3_3x_fb31ff2c98.png"
            alt="Vision"
            class="mx-auto w-full max-w-md"
          >

          <div>
            <h2 class="section-title">TẦM NHÌN VÀ SỨ MỆNH</h2>

            <p class="mt-4 font-semibold text-green-600">
              BẢO ĐẢM TỐC ĐỘ CÙNG MỘT VIỆT NAM HÙNG CƯỜNG.
            </p>

            <ul
              class="mt-4 list-inside list-disc space-y-2 text-sm text-gray-700"
            >
              <li>Tạo môi trường làm việc năng động, thân thiện.</li>
              <li>Phát triển tối đa sự hài lòng của khách hàng.</li>
              <li>Trở thành tập đoàn dẫn đầu chuyên nghiệp.</li>
            </ul>

            <p class="mt-4 text-sm text-gray-700">
              Phương Trang luôn phấn đấu làm việc hiệu quả nhất, để luôn cống
              hiến, đóng góp hết sức mình vì một Việt Nam hùng cường.
            </p>
          </div>
        </section>

        <!-- GIÁ TRỊ CỐT LÕI -->
        <section class="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h2 class="section-title">GIÁ TRỊ CỐT LÕI</h2>

            <div class="mt-4 space-y-4 text-sm text-gray-700">
              <p>
                <strong class="text-green-600">Phụng sự:</strong>
                Phương Trang nghĩa là Vương, với ý chí hết mình vì cộng đồng.
              </p>

              <p>
                <strong class="text-green-600">Trung thực:</strong>
                Luôn minh bạch, công bằng trong mọi hoạt động kinh doanh.
              </p>

              <p>
                <strong class="text-green-600">Chính trực:</strong>
                Biểu tượng của sự phát triển dựa trên những giá trị đạo đức tốt
                đẹp.
              </p>
            </div>
          </div>

          <img
            src="https://cdn.futabus.vn/futa-busline-web-cms-prod/Artboard_4_3x_44277bbc3b/Artboard_4_3x_44277bbc3b.png"
            class="mx-auto w-full max-w-md rounded-lg object-cover"
            alt="Core Values"
          >
        </section>

        <!-- TRIẾT LÝ -->
        <section class="grid items-center gap-10 md:grid-cols-2">
          <img
            src="https://cdn.futabus.vn/futa-busline-web-cms-prod/Artboard_5_3x_cf15563d46/Artboard_5_3x_cf15563d46.png"
            class="mx-auto w-full max-w-md"
            alt="Philosophy"
          >

          <div>
            <h2 class="section-title">TRIẾT LÝ</h2>

            <p class="mt-4 text-sm leading-relaxed text-gray-700">
              Hội nhập và phát triển gắn liền với tinh thần quốc gia. Nguồn nhân
              lực chính là nền tảng then chốt của Công ty Phương Trang. Chúng
              tôi không ngừng cải tiến, nâng cao chất lượng dịch vụ nhằm mang
              đến trải nghiệm tốt nhất cho khách hàng.
            </p>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
.section-title {
  @apply text-xl font-bold text-green-600;
}
</style>
