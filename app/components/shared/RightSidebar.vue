<script setup lang="ts"></script>

<template>
  <section
    class="custom-scrollbar bg-light900_dark200 light-border shadow-light-300 sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 pt-36 dark:shadow-none max-xl:hidden"
  >
    <div>
      <h3 class="h3-bold text-dark200_light900">Top Questions</h3>

      <div class="mt-7 flex w-full flex-col gap-8">
        <NuxtLink
          class="flex cursor-pointer items-center justify-between gap-7"
          to="/question/66e8721139ae4ddb7d0cbc56"
        >
          <p class="body-medium text-dark500_light700">
            How to Ensure Unique User Profile with ON CONFLICT in PostgreSQL
            Using Drizzle ORM?
          </p>

          <NuxtImg
            src="https://devflow-rose.vercel.app/assets/icons/chevron-right.svg"
            height="20"
            width="20"
            loading="lazy"
            decoding="async"
            data-nimg="1"
            style="color: transparent"
            class="invert-colors"
          />
        </NuxtLink>

        <NuxtLink
          class="flex cursor-pointer items-center justify-between gap-7"
          to="/question/66e8723768ca0eff0f9df801"
        >
          <p class="body-medium text-dark500_light700">
            What are the benefits and trade-offs of using Server-Side Rendering
            (SSR) in Next.js?
          </p>

          <NuxtImg
            src="https://devflow-rose.vercel.app/assets/icons/chevron-right.svg"
            height="20"
            width="20"
            loading="lazy"
            decoding="async"
            data-nimg="1"
            style="color: transparent"
            class="invert-colors"
          />
        </NuxtLink>
        <NuxtLink
          class="flex cursor-pointer items-center justify-between gap-7"
          to="/question/66e91c31d4801f17120bfff1"
        >
          <p class="body-medium text-dark500_light700">How to center a div?</p>

          <NuxtImg
            src="https://devflow-rose.vercel.app/assets/icons/chevron-right.svg"
            height="20"
            width="20"
            loading="lazy"
            decoding="async"
            data-nimg="1"
            style="color: transparent"
            class="invert-colors"
          />
        </NuxtLink>
        <NuxtLink
          class="flex cursor-pointer items-center justify-between gap-7"
          to="/question/66e9355505f25f68aa6fa064"
        >
          <p class="body-medium text-dark500_light700">
            Node.js res.json() and res.send(), not working but still able to
            change status code
          </p>

          <NuxtImg
            src="https://devflow-rose.vercel.app/assets/icons/chevron-right.svg"
            height="20"
            width="20"
            loading="lazy"
            decoding="async"
            data-nimg="1"
            style="color: transparent"
            class="invert-colors"
          />
        </NuxtLink>
        <NuxtLink
          class="flex cursor-pointer items-center justify-between gap-7"
          to="/question/66edc4e897df959ef70b5a25"
        >
          <p class="body-medium text-dark500_light700">
            ReactJs or NextJs for begginers i ask for advice
          </p>

          <NuxtImg
            src="https://devflow-rose.vercel.app/assets/icons/chevron-right.svg"
            height="20"
            width="20"
            loading="lazy"
            decoding="async"
            data-nimg="1"
            style="color: transparent"
            class="invert-colors"
          />
        </NuxtLink>
      </div>
    </div>

    <div class="mt-16">
      <h3 class="h3-bold text-dark200_light900">Popular Tags</h3>
      <div class="mt-7 flex flex-col gap-4">
        <NuxtLink
          class="flex justify-between gap-2"
          to="/tags/66e871abc1f0844043316b4b"
        >
          <div
            class="subtle-medium bg-light800_dark300 text-light400_light500 inline-flex items-center rounded-md border border-none border-transparent bg-slate-900 px-4 py-2 text-xs font-semibold uppercase shadow transition-colors hover:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80 dark:focus:ring-slate-300"
          >
            nextjs
          </div>
          <p class="small-medium text-dark500_light700">6</p>
        </NuxtLink>
        <NuxtLink
          class="flex justify-between gap-2"
          to="/tags/66e93555c1f08440430aa395"
        >
          <div
            class="subtle-medium bg-light800_dark300 text-light400_light500 inline-flex items-center rounded-md border border-none border-transparent bg-slate-900 px-4 py-2 text-xs font-semibold uppercase shadow transition-colors hover:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80 dark:focus:ring-slate-300"
          >
            javascript
          </div>
          <p class="small-medium text-dark500_light700">3</p>
        </NuxtLink>
        <NuxtLink
          class="flex justify-between gap-2"
          to="/tags/66e93555c1f08440430aa3b6"
        >
          <div
            class="subtle-medium bg-light800_dark300 text-light400_light500 inline-flex items-center rounded-md border border-none border-transparent bg-slate-900 px-4 py-2 text-xs font-semibold uppercase shadow transition-colors hover:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80 dark:focus:ring-slate-300"
          >
            reactjs
          </div>
          <p class="small-medium text-dark500_light700">3</p>
        </NuxtLink>
        <NuxtLink
          class="flex justify-between gap-2"
          to="/tags/66ed93c2c1f0844043f3e1b0"
        >
          <div
            class="subtle-medium bg-light800_dark300 text-light400_light500 inline-flex items-center rounded-md border border-none border-transparent bg-slate-900 px-4 py-2 text-xs font-semibold uppercase shadow transition-colors hover:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80 dark:focus:ring-slate-300"
          >
            react
          </div>
          <p class="small-medium text-dark500_light700">2</p>
        </NuxtLink>
        <NuxtLink
          class="flex justify-between gap-2"
          to="/tags/66e87211c1f084404331dce1"
        >
          <div
            class="subtle-medium bg-light800_dark300 text-light400_light500 inline-flex items-center rounded-md border border-none border-transparent bg-slate-900 px-4 py-2 text-xs font-semibold uppercase shadow transition-colors hover:bg-slate-900/80 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 dark:border-slate-800 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/80 dark:focus:ring-slate-300"
          >
            postgres
          </div>
          <p class="small-medium text-dark500_light700">2</p>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
